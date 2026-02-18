const { tokenize } = require('./tokenize') 
const fs = require('fs') 
const path = require('path') 

const indexBuilder = (docDir) => {
    const docIdToName = {}
    const index = {}

    const DOCS = docDir ?? path.join(__dirname,'..','..','docs') //joining to the correct folder. Used to build docs.

    const list = fs.readdirSync(DOCS) 

    const files = list.filter(f => f.endsWith(".txt")) 
         
    files.sort() 
    
    for (let i = 0; i < files.length; i++) {
        const docId = i 
        const filename = files[i] 
        docIdToName[docId] = filename 
         
        const fullpath = path.join(DOCS, filename) //path to filename from DOCS
        const text = fs.readFileSync(fullpath, "utf8")//“Node decodes bytes as UTF-8 text”.

        const tokens = tokenize(text) 

        const uniqueTokens = new Set(tokens) 
        
        for (const token of uniqueTokens) { 
            if (!index[token]) {  
                index[token] = []
            }
            index[token].push(docId)   
        }
    }

    return { index, docIdToName }
}

module.exports = { indexBuilder }