const { indexBuilder } = require("./indexer")
const { tokenize } = require("./tokenize")
const { scorer } = require('./scorer')

const createSearch = (docsDir) => {
    const indexer = indexBuilder(docsDir)

 
const search = (query) => {

    const { index, docIdToName} = indexer

    const queryTokens = tokenize(query)  
    if (queryTokens.length === 0) return []

 
  let currentDocs = null;

    for (let i = 0; i < queryTokens.length; i++) {
        const token = queryTokens[i] 
        const postings = index[token] 

        if (!postings || postings.length === 0) { 

            return []
        }

            if (currentDocs === null) {
                currentDocs = new Set(postings) 
                continue
            }

            for (let x = 0; x < postings.length; x++) { 
                let number = postings[x]

                currentDocs.add(number)
            }
        }

        let result = [] 
        
         for (const docId of currentDocs) {
            let docInfo = {}
            let score = scorer(indexer,query, docId)

            docInfo.filename = docIdToName[docId]
            docInfo.docId = docId
            docInfo.score = score

            result.push(docInfo)
        }

    

}

    return search
}

    module.exports = { createSearch }


