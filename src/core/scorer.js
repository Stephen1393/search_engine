const { tokenize } = require('../../src/core/tokenize')


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

       const tokenPositions = indexer.docMeta[docId].titlePositions
       let proxScore = 0
       let partial = false
       let current

       for (let i = 0; i < queryTokens.length - 1; i++) {
        let tokenA = queryTokens[i]
        let tokenB = queryTokens[i + 1]
    
        if (tokenPositions[tokenB] === undefined) {
            return result
        }

        if (i === 0) {
            current = tokenPositions[tokenA]
        }

        let matches = []

        for (let j = 0; j < current.length; j++) {
            let tokenLocation = current[j]
        

        for (let x = 0; x < tokenPositions[tokenB].length; x++) {
            let tokenLocation2 = tokenPositions[tokenB][x]

            if (tokenLocation2 === tokenLocation + 1) {
                matches.push(tokenLocation2)
            }
        }

    }

        current = matches

        if (matches.length === 0) { return result}

        if (matches.length > 0 && partial === false) {
            partial = true
            proxScore += 1
        }
        if (i === queryTokens.length -2 && matches.length > 0) {proxScore += 1}


    }
    return proxScore
    
}

    function spam (indexer,queryTokens, docId) {
        const tokenPositions = indexer.docMeta[docId].tokenPositions
        let memory = []
        let spamScore = 0
        
        for (let i = 0; i < queryTokens.length; i++) {
            let token = queryTokens[i]
            let current = tokenPositions[token]
            
            if (current === undefined) {
                continue
            }

            if (memory.includes(token)) {
                continue
            }

        for (let j = 0; j < current.length - 2; j++) {
            let currentNumber = current[j]
            let nextNumber = current[j + 1]
            let nextNext = current[j + 2]

            if (nextNumber === currentNumber + 1 && nextNext === currentNumber + 2) {
                spamScore -= 1
            }
        }
        
        memory.push(token)
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

return scorer

}

module.exports =  { scorer }