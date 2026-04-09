const { tokenize } = require('../../src/core/tokenize')

let score = 0

const scorer = (indexer, query, docId) => {

    const queryTokens = tokenize(query)
    const titleTokens = indexer.docMeta[docId].titleTokens
    let tiltleScore = 0

    for (let i = 0; i < queryTokens.length; i++) {
        let position = i
        let token = queryTokens[position]

         if (titleTokens.includes(token)) {
                tiltleScore += 1
            }

            let match;

        for (let j = 0; j < titleTokens.length; j++) {
            let position2 = j
            let token2 = titleTokens[position2]


            if (token === token2) {
                
                if (match !== undefined) {
                    if (j === match +1) {
                        tiltleScore +2
                    }
                }

                match = j
            }

        }
    }

    const proximity = (indexer, query, docId) => {

       const queryTokens = tokenize(query)
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
    
}

const spam = (indexer, query, docId) => {
    const queryTokens = tokenize(query)
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
    
}

}
