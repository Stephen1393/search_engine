const { tokenize } = require('../../src/core/tokenize')


 const scorer = (indexer, query, docId) => {
     const result = {}

     const queryTokens = tokenize(query)
     
    // const titleScore = titleTerms(indexer, queryTokens, docId)
     const proxScore = proximity(indexer, queryTokens, docId)
     const spamScore = spam(indexer, queryTokens, docId)
     const rareScore = rarity(indexer, queryTokens)
     const freqScore = frequency(indexer, queryTokens, docId)
     const wordsScore = keyWords(indexer, docId)
     const divScore = diversity(indexer, docId)
     const contScore = useful_content(indexer, docId)
     const errorCount = error_tags(indexer,queryTokens, docId)

     const total = 
     proxScore + spamScore + rareScore +
     freqScore + wordsScore + divScore + contScore + errorCount 
     
      // result.title = titleScore
     result.proximity = proxScore
     result.spam = spamScore
     result.rarity = rareScore
     result.frequency = freqScore
     result.keyWords = wordsScore
     result.diversity = divScore
     result.useful_content = contScore
     result.error_tags = errorCount
     result.total = total

//  leaving title Tokens scorer out . wasn't helpful for ranking useful content first

 /* function titleTerms (indexer,queryTokens, docId) {

   
    const titleTokens = indexer.docMeta[docId].titleTokens
    let titleScore = 0

    for (let i = 0; i < queryTokens.length; i++) {
        let position = i
        let token = queryTokens[position]


         if (titleTokens.includes(token)) {
                titleScore += 1

         }

            let match;

        for (let j = 0; j < titleTokens.length; j++) {
            let position2 = j
            let token2 = titleTokens[position2]

            if (token === token2) {
                
                if (match !== undefined) {
                    if (j === match +1) {
                        titleScore +2
                    }
                }

                match = j
            }

        }
    }
    return titleScore 
} */

    function proximity (indexer,queryTokens, docId) {

       const termPositions = indexer.docMeta[docId].termPositions
       let proxScore = 0
       let partial = false
       let current


       for (let i = 0; i < queryTokens.length - 1; i++) {
        let tokenA = queryTokens[i] 
        let tokenB = queryTokens[i + 1] 

       const positionA = termPositions[tokenA]
       const positionB = termPositions[tokenB]
    
        if (!positionA || !positionB) {continue}

        if (!current) { current = positionA }

        let matches = []

        for (let j = 0; j < current.length; j++) { 
            let tokenLocation = current[j]
        

        for (let x = 0; x < termPositions[tokenB].length; x++) {
            let tokenLocation2 = termPositions[tokenB][x] 

            if (tokenLocation2 === tokenLocation + 1) {
                matches.push(tokenLocation2)
            }
        }

    }

        current = matches 

        if (matches.length === 0) { return proxScore}

        if (matches.length > 0 && partial === false) {
            partial = true
            proxScore += 1
        }
        if (i === queryTokens.length -2 && matches.length > 0) {proxScore += 1}


    }
    return proxScore
    
}

    function spam(indexer, queryTokens, docId) {

    const termPosition = indexer.docMeta[docId].termPositions
    let spamScore = 0
    let pairs = []

  
    for (let i = 0; i < queryTokens.length; i++) {

        let tokenA = queryTokens[i]
        let current = termPosition[tokenA]
        if (!current) continue

        for (let j = 0; j < current.length - 2; j++) {
            let a = current[j]
            let b = current[j + 1]
            let c = current[j + 2]

            if (b === a + 1 && c === a + 2) {
                spamScore -= 1
            }
        }
    }

  
    let tokenA = queryTokens[0]
    let tokenB = queryTokens[1]

    let current = termPosition[tokenA]
    let next = termPosition[tokenB]

    if (queryTokens.length < 2) {return spamScore}

    if (current && next) {
        for (let j = 0; j < current.length; j++) {
            let posA = current[j]

            for (let x = 0; x < next.length; x++) {
                let posB = next[x]

                if (posB === posA + 1) {
                    pairs.push([posA, posB])
                }
            }
        }
    }

    
    let firstPair = false

    for (let p = 0; p < pairs.length - 1; p++) {
        let couple = pairs[p]
        let endNum = couple[couple.length - 1]
        let couple2 = pairs[p + 1]
        let startNum = couple2[0]

        if (startNum - endNum <= 5) {
            if (firstPair === false) {
                firstPair = true
                spamScore -= 1
            }
        }
    }

    return spamScore
}

function frequency (indexer, queryTokens, docId) {
    let freqScore = 0
    const termPosition = indexer.docMeta[docId].termPositions

    const queryTerms = new Set(queryTokens) 

    for (let token of queryTerms) { 

        if (!termPosition[token]) {continue} 

        let tokenFrequency = termPosition[token] 

        if (tokenFrequency.length <= 2) { 
            freqScore += 0.5
        }
        if (tokenFrequency.length >= 3 && tokenFrequency.length <= 5) {
            freqScore += 1
        }
        if (tokenFrequency.length >= 6 && tokenFrequency.length <= 8) {
            freqScore += 0
        }
        if (tokenFrequency.length > 8) {
            freqScore -= 1
        }
    }
    return freqScore
}

function diversity (indexer, docId) {

    const termPosition = indexer.docMeta[docId].termPositions

    const usefulTokens = []

    const fillerTokens = new Set ([
        "a", "an", "the",
        "is", "are", "was", "were",
        "of", "in", "on", "at", "to", "for", "with", "by", "from",
        "and", "or", "but", "so",
        "this", "that", "it", "as", "if", "then"])

        if (!termPosition) {return divScore}

        for (let token in termPosition) {
            if (fillerTokens.has(token)) continue
            
            for (let i = 0; i < termPosition[token].length; i++) {
                usefulTokens.push(token)
            }
        }
        
        const uniqueTokens = new Set(usefulTokens)
        
        let ratio = uniqueTokens.size / usefulTokens.length
        
         
        
       let divScore = ratio * 4

        
        return divScore
    
    }

    function useful_content (indexer, docId) {

        let contScore = 0

        const termPosition = indexer.docMeta[docId].termPositions

        let usefulTokens = []

        const fillerTokens = new Set ([
        "a", "an", "the",
        "is", "are", "was", "were",
        "of", "in", "on", "at", "to", "for", "with", "by", "from",
        "and", "or", "but", "so",
        "this", "that", "it", "as", "if", "then"])

        if (!termPosition) {return contScore}

        for (let token in termPosition) {
            if (fillerTokens.has(token)) {continue}

            for (let i = 0; i < termPosition[token].length; i++) {
                usefulTokens.push(token)
            }
        }

        let result = usefulTokens.length

        if (result < 15) {contScore -= 1}
        if (result <= 20 && result >= 15) {contScore -= 0.5}
        if (result > 20 && result <= 40) {contScore += 0.5}
        if (result > 40 && result <= 60) {contScore += 1}
        if (result > 60 && result <= 80) {contScore += 1.5}
        if (result > 80) {contScore += 2}


    return contScore

    }
    


function keyWords (indexer, docId) {

    let wordsScore = 0

    const termPosition = indexer.docMeta[docId].termPositions

    const group = new Set (["solution", "fix", "cause", "causes", "fixes", "return", "value", "object", "data", "property", "async"])
    const group2 = new Set([])

    for (let token of group) {
        if (!termPosition[token]) {continue}
        group2.add(token)


    }

    let count = group2.size
        
        if (count <= 2) {wordsScore += 0.5}
        if (count > 2 && count <= 4) {wordsScore += 1}
        if (count > 4) {wordsScore += 1.5}

        
    
return wordsScore
}
    


    function rarity (indexer, queryTokens) {
        const docs = indexer.index
        let rareScore = 0
        let memory;
        
        for (let i = 0; i < queryTokens.length; i++) {
            let token = queryTokens[i]
            
            if (docs[token] === undefined) {
                continue
            }
            
            let current = docs[token].length
            
            if (memory === undefined || memory > current) {
                
                memory = current 
            }
        
        }

    if (memory !== undefined) {rareScore += 1}

    return rareScore
}

return result

}

function error_tags (indexer, queryTokens, docId) {

    let errorCount = 0
    const termPosition = indexer.docMeta[docId].termPositions
    let errorWords = new Set(["length", "map"])
    let errorMatch = new Set([])

    const queryTerms = new Set(queryTokens)
    
    for (let term of queryTerms) {
        if (errorWords.has(term))
        
            errorMatch.add(term)
        

        if (termPosition[term]) {
            if (errorMatch.has(term))

            if (errorCount === 0) {
                errorCount += 1
            } 
            if (errorCount === 1) {
                errorCount += 0.5
            }
            
        }
    }

    return errorCount
    
}


module.exports =  { scorer }