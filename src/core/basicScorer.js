const { tokenize } = require('./tokenize')

const basicScorer = (indexer,query, docId) => {
    let score = 0
    const queryTokens = tokenize(query)
    const tokenPosition = indexer.docMeta[docId].tokenPosition
    const queryTerms = new Set(queryTokens)

    for (const term of queryTerms) {

        if (docMeta[docId] === undefined || tokenPosition[term] === undefined) {
        continue 
    }

        let current = tokenPosition[term]

        if (current !== undefined) {
            score += 1
    }
}

const result = {}
result.tokenPosition = score

return result 

}

module.exports = { basicScorer }