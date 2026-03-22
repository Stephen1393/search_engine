const { createSearch } = require('../src/core/search')

const search = createSearch('./test_docs')
const result = search('hello')


console.log(result)
