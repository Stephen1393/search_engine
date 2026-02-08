const { tokenize } = require('./tokenize') 
const fs = require('fs') //require fs for local files
const path = require('path') //require path to know where to join from -- to

const indexBuilder = () => {
    const docIdToName = {}
    const index = {}

    const list = fs.readdirSync(DOCS) //list files

    const files = list.filter(f => f.endsWith(".txt")) //filter files ending with .txt
         
    files.sort() //sort files ending it .txt

     const DOCS = path.join(__dirname,'..','..','docs') //joining to the correct folder. Used to build docs.

    for (let i = 0; i < files.length; i++) {
        const docId = i //is the position of i (0,1,2,3,etc)
        const filename = files[i] //name of the file at the index
        docIdToName[docId] = filename //this is the number (i) to equal filename. "0 computerscience.txt"
         
        const fullpath = path.join(DOCS, filename) //path to filename from DOCS
        const text = fs.readFileSync(fullpath, "utf8")//"utf8". Nodes decodes raw bytes in english

        const tokens = tokenize(text) //the result of the tonkenize script

        const uniqueTokens = new Set(tokens) //get rid of duplicates -- repeated words
        
        for (const token of uniqueTokens) { //for..of is interested in values, not indexes
            if (!index[token]) {  //Seen the token before?
                index[token] = []//...add to postings
            }
            index[token].push(docId) //push the token with the doc(s) Id   
        }
    }

    return { index, docIdToName }
}

module.exports = { indexBuilder }