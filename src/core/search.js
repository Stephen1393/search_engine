const { indexBuilder } = require("./indexer")
const { tokenize } = require("./tokenize")
const { scorer } = require('./scorer')
const { basicScorer }  = require('./basicScorer') 

const createSearch = (docsDir) => {
    const indexer = indexBuilder(docsDir)

 
const search = (query) => {

    let activeScorer = scorer

    const { index, docIdToName} = indexer

    const queryTokens = tokenize(query)  
    if (queryTokens.length === 0) return []

 
  let currentDocs = null;

    for (let i = 0; i < queryTokens.length; i++) {
        const token = queryTokens[i] 
        const postings = index[token] 

        if (!postings) { return [] }

            if (currentDocs === null) {
                currentDocs = new Set(postings) 
                continue
            }

            for (let x = 0; x < postings.length; x++) { 
                let number = postings[x]

                currentDocs.add(number)
            }
        }

        if (currentDocs === null) { return [] }

        let result = [] 

         for (const docId of currentDocs) {
            let docInfo = {}
            let score = activeScorer(indexer,query, docId)

            docInfo.filename = docIdToName[docId]
            docInfo.docId = docId
            docInfo.score = score

            result.push(docInfo)
        }

        result.sort((a, b) => b.score - a.score)
        
        return result
    
    }

    return search("TypeError: Cannot read properties of undefined (reading 'length')")
}

    module.exports = { createSearch }


