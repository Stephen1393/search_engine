const { indexBuilder } = require("./indexer")
const { tokenize } = require("./tokenize")

const createSearch = (docsDir) => {
    const indexer = indexBuilder(docsDir)

 
const search = (query) => {

    const { index, docIdToName, docMeta } = indexer

    const queryTokens = tokenize(query)  
    if (queryTokens.length === 0) return []

 
  let currentDocs = null;

    for (let i = 0; i < queryTokens.length; i++) {
        const token = queryTokens[i] 
        const postings = index[token]

        if(!postings || postings.length === 0) { 

            return []
        }

            if (currentDocs === null ) {
                currentDocs = new Set(postings)
                continue
            
            }
         
        const sharedDocs = new Set()
        for (let x = 0; x < postings.length; x++) {
            let docId = postings[x]
            if (currentDocs.has(docId)) {
                sharedDocs.add(docId)
            }
        }
        currentDocs = sharedDocs

        if (currentDocs.size === 0) return []
    }
        
        let result = [...currentDocs].sort((a,b) => a - b).slice(0,5)

    const results = result.map((docId) => ({
        id: docId,
        filename: docIdToName[docId]

    }))

    return results
        
    }

    return search
}

    module.exports = { createSearch }


