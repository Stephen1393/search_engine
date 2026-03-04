const { indexBuilder } = require('../src/core/indexer')
const { createSearch } = require('../src/core/search')
const path = require('path')

const testDocs = path.join(__dirname,"..", "test_docs")
const search = createSearch(testDocs)

describe('search...', () => {

    it('returns empty array when query is empty...', () => {

        const results = search("")

        expect(results).toEqual([])
    })

    it('maps docId and filename to correct query', () => {

        const results = search("hello world!!!")

        expect(results).toEqual([{ id: 3, filename: "doc04.txt" }])

    })
})