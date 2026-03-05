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

        const results = search("hello everyone")

        expect(results.length).toBeGreaterThan(0)
        expect(results).toContainEqual({ id: 0, filename: "doc01.txt" })

    })

    it('returns empty array with single token miss...', () => {
        
        const result = search("pencil")

        expect(result).toEqual([])
    })

    it('returns empty array if doc doesnt include both tokens. (Use of AND)', () => {

        const results = search('Hello there')

        expect(results).toEqual([])
    })

    it('returns a limit of 5 matching docs...', () => {

         const results = search("good morning")
         const ids = results.map(r => r.id)

         expect(results).toHaveLength(5)
         expect(ids).toEqual([5,6,7,8,9])
    })
})