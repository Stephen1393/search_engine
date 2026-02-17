const { tokenize } = require('./tokenize') 
const fs = require('fs') 
const path = require('path') 

const indexBuilder = () => {
    const docIdToName = {}
    const index = {}

    const list = fs.readdirSync(DOCS) 

    const files = list.filter(f => f.endsWith(".txt")) 
         
    files.sort() 

     const DOCS = path.join(__dirname,'..','..','docs') //joining to the correct folder. Used to build docs.

    for (let i = 0; i < files.length; i++) {
        const docId = i 
        const filename = files[i] 
        docIdToName[docId] = filename 
         
        const fullpath = path.join(DOCS, filename) //path to filename from DOCS
        const text = fs.readFileSync(fullpath, "utf8")//"utf8". Nodes decodes raw bytes in english

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