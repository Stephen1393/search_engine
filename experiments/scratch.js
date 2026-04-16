const { createSearch } = require('./../src/core/search')

const testDocs = path.join(__dirname,"..", "test_docs")
const search = createSearch(testDocs)

let result = search("TypeError: Cannot read properties of undefined (reading 'length')")

console.log(result)