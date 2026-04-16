const { createSearch } = require('./../src/core/search')
const path = require('path')

const testDocs = path.join(__dirname,"..", "test_docs")
const search = createSearch(testDocs)

const name = "stehpen"
console.log(name)

let result = search("TypeError: Cannot read properties of undefined (reading 'length')")

console.log(result)

const queryTokens = tokenise(query)