const scorer = (indexer, query, docId) => {
     const result = {}

     const queryTokens = tokenize(query)
     
     const titleScore = titleTerms(indexer, queryTokens, docId)
     const proxScore = proximity(indexer, queryTokens, docId)
     const spamScore = spam(indexer, queryTokens, docId)
     const rareScore = rarity(indexer, queryTokens)
     const total = titleScore + proxScore + spamScore + rareScore
     
     result.title = titleScore
     result.proximity = proxScore
     result.spam = spamScore
     result.rarity = rareScore
     result.total = total


function titleTerms (indexer,queryTokens, docId) {

   
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
}

    function proximity (indexer,queryTokens, docId) {

       const termPositions = indexer.docMeta[docId].termPositions
       let proxScore = 0
       let partial = false
       let current

       for (let i = 0; i < queryTokens.length - 1; i++) {
        let tokenA = queryTokens[i] 
        let tokenB = queryTokens[i + 1] 
    
        if (termPositions[tokenB] === undefined) {
            return proxScore
        }

        if (i === 0) {
            current = termPositions[tokenA] 
        }

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

    function spam (indexer,queryTokens, docId) {

       const termPosition = indexer.docMeta[docId].termPosition
       let spamScore = 0
       let current
       

       for (let i = 0; i < queryTokens.length - 2; i++) {
        let tokenA = queryTokens[i]
        let tokenB = queryTokens[i + 1]
        let tokenC = queryTokens[i + 2]

        if (tokenB === undefined || tokenC === undefined) {continue}

        if (i === 0) {current = termPosition[tokenA]}

        for (let j = 0; j < current.length - 2; j++) {
         let termPosition = current[j]
         let nextTerm = current[j + 1]
         let nextNextTerm = current[j + 2]

         if (nextTerm === termPosition + 1 && nextNextTerm === termPosition + 2) {spamScore -= 1}

         let pairs = []
         let fullQuery = []

         for (let x = 0; x < termPosition[tokenB].length; x++) {
            let termPosition2 = termPosition[tokenB][x]

            if (i === 0) {
                if (termPosition2 === termPosition + 1) {
                    pairs.push([termPosition, termPosition2])
                }
            }

            for (let y = 0; y < termPosition[tokenC].length; y++) {
                let termPosition3 = termPosition[tokenC]

                    if (termPosition2 === termPosition + 1) {
                        if (termPosition3 === termPosition2 + 1) {
                            fullQuery.push([termPosition, termPosition2, termPosition3])

                        }
                    }
                }
            }

            let firstFully = false
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

            for (let i = 0; i < fullQuery.length - 1; i++) {
                let match = fullQuery[i]
                let end = match[match.length - 1]
                let match2 = fullQuery[i + 1]
                let start = match2[0]

                if (start - end <= 5) {
                    if (firstFully === false) {
                        firstFully = true
                        spamScore -= 1
                    }
                }
            }
        }
    }
}
    
    return spamScore
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

module.exports =  { scorer }
