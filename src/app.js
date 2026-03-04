const { createSearch } = require('../src/core/search')
const path = require('path')

const docsDir = path.join(__dirname, "..", "docs")

const search = createSearch(docsDir)

