const { indexBuilder } = require("./indexer")
const { tokenize } = require("./tokenize")

const indexer = indexBuilder()
 
const search = (query) => {

    const { index, docIdToName } = indexer

    const queryTokens = tokenize(query) //"space Travel" -- ["space","Travel"]
    if (queryTokens.length === 0) return []

 
  let currentDocs = null;

    for (let i = 0; i < queryTokens.length; i++) {
        const token = queryTokens[i] //["space"] ["token"]
        const postings = index[token]// [0,2,1] 

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
        
        let result = [...currentDocs].sort((a,b) => a - b).slice(0,10)

    const results = result.map((docId) => ({
        id: docId,
        filename: docIdToName[docId],
    }))
    
    return results
        
    }

    module.exports = { search }


