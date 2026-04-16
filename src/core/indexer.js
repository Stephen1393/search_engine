const { tokenize } = require('./tokenize') 
const fs = require('fs') 
const path = require('path') 
const { tokenTitle } = require('./tokenTitle')

const indexBuilder = (docDir) => {
    const docIdToName = {}
    const index = {}
    const docMeta = {}

    const DOCS = docDir ?? path.join(__dirname,'..','..','docs')

    const list = fs.readdirSync(DOCS) 

    const files = list.filter(f => f.endsWith(".txt")) 
         
    files.sort() 
    
    for (let i = 0; i < files.length; i++) {
        const docId = i 
        const filename = files[i] 
        docIdToName[docId] = filename 
         
        const fullpath = path.join(DOCS, filename) 
        const text = fs.readFileSync(fullpath, "utf8")

        const tokens = tokenize(text) 

        const uniqueTokens = new Set(tokens) 
        
        for (const token of uniqueTokens) { 
            if (!index[token]) {  
                index[token] = []
            }
            index[token].push(docId)   
        } 

        docMeta[docId] = {} 
        const termPositions = {}
        docMeta[docId].termPositions = termPositions
    

        for (let i = 0; i < tokens.length; i++) {
            const tokenPosition = i
            const token = tokens[i]

            if (!termPositions[token]) {
                termPositions[token] = []
            }
            termPositions[token].push(tokenPosition)
        }

        const docLength = tokens.length
        docMeta[docId].docLength = docLength

        
        const titles = tokenTitle(filename)
        const uniqueTitles = new Set(titles)

        const titleTokens = {titleTokens: []}
        docMeta[docId].titleTokens = titleTokens

        for (const titleTokes of uniqueTitles) {
            titleTokens.titleTokens.push(titleTokes)
        }
    }
    
    return { index, docIdToName, docMeta }
}

module.exports = { indexBuilder }