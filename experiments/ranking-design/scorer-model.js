const { tokenize } = require('../../src/core/tokenize')

const scorer = (indexer, query, docId) => {

    let score = 0
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
}
return scorer

