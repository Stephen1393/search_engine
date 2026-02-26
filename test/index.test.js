const { tokenize } = require('../src/core/tokenize')
const { indexBuilder } = require('../src/core/indexer')
const  path  = require('path')

const DOCS = path.join(__dirname,"..","test_docs")

describe('indexBuilder...', () => {

    test('returns sorted filenames', () => {

        const array = []

        const result = indexBuilder(DOCS)

        array.push(result.docIdToName[0])
        array.push(result.docIdToName[1])
        array.push(result.docIdToName[2])

        expect(array).toEqual(['doc01.txt', 'doc02.txt', 'doc03.txt'])
    })

    test("'hello' maps to correct docIds...", () => {

        const result = indexBuilder(DOCS)

        const token = result.index['hello']

        expect(token).toEqual([0, 3, 4])
    
    })

    test("'word' maps to single docId", () => {

        const result = indexBuilder(DOCS)

        const token = result.index['word']   

        expect(token).toEqual([2])
    })

    test('Nontoken to return undefined', () => {

        const result = indexBuilder(DOCS)

        const token = result.index["pencil"]

        expect(token).toEqual(undefined)
    })

    test('postings contain no duplicate docIds', () => {

        const result = indexBuilder(DOCS)

        const postings = result.index["hello"]

        const unique = new Set(postings)


        expect(postings.length).toEqual(unique.size)
    })

})