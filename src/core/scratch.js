const { createSearch } = require('./search')
const path = require('path')

const testDocs = path.join(__dirname,"..","..", "test_docs", "test1_typeError")
const search = createSearch(testDocs)

let result = search("cannot read property length")

console.log(result)