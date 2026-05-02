const { createSearch } = require('./search')
const path = require('path')

const testDocs = path.join(__dirname,"..","..", "test_docs", "test1_typeError")
const search = createSearch(testDocs)

let result = search("why is length undefined")

console.log(result)