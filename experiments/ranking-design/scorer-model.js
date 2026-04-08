const { tokenize } = require('../../src/core/tokenize')

let score = 0

const scorer = (indexer, query, docId) => {

    const queryTokens = tokenize(query)
    const titleTokens = indexer.docMeta[docId].titleTokens

    for (let i = 0; i < queryTokens.length; i++) {
        let position = i
        let token = queryTokens[position]

         if (titleTokens.includes(token)) {
                score += 1
            }

            let match;

        for (let j = 0; j < titleTokens.length; j++) {
            let position2 = j
            let token2 = titleTokens[position2]


            if (token === token2) {
                
                if (match !== undefined) {
                    if (j === match +1) {
                        score +2
                    }
                }

                match = j
            }

        }
    }

    const proximity = (indexer, query, docId) => {

       const queryTokens = tokenize(query)
       const tokenPositions = indexer.docMeta[docId].titlePositions
       let result = 0
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
            result += 1
        }
        if (i === queryTokens.length -2 && matches.length > 0) {result += 1}


    }
    return result
}

}
