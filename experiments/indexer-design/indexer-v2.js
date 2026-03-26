const { tokenize } = require('../../src/core/tokenize') 
const fs = require('fs') 
const path = require('path') 
const tokenTitle = require('./tokenTitle')


const indexBuilder = (docDir) => {
    const docIdToName = {}
    const index = {}
    const docMeta = {}

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

        const termPositions = {}
        docMeta[docId] = termPositions

        for (let i = 0; i < tokens.length; i++) {
            const tokenPosition = i
            const token = tokens[i]

            if (!termPositions[token]) {
                termPositions[token] = []
            }
            termPositions[token].push(tokenPosition)
        }

        
        const titles = tokenTitle(filename)
        const uniqueTitles = new Set(titles)

        const titleTokens = {titleTokens: []}
        docMeta[docId] = titleTokens

        for (const titleTokes of uniqueTitles) {
            titleTokens.titleTokens.push(titleTokes)
        }
    }
    
    return { index, docIdToName, docMeta }
}