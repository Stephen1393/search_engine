const { tokenize } = require('../src/core/tokenize')

describe("tokenize", () => {

    test("returns lowercase letters", () => {

        expect(tokenize("SPACE TRAVEL")).toEqual(["space", "travel"])

    })

    test("characters allowed: letters, digits [0-9], #, +, and -" , () => {
        
        expect(tokenize("C++!! e-mail and #devOps?123")).toEqual(["c++", "e-mail", "and", "#devops", "123"])
    })

    test("allowed punctuation must contain a digit OR letter", () => {

        expect(tokenize("++")).toEqual([])
        expect(tokenize("---")).toEqual([])
        expect(tokenize("++--1")).toEqual(["++--1"])
        expect(tokenize("#??!2")).toEqual(["2"])
    
    })

    test("returns empty array with whitespace, emppty string" , () => {

        expect(tokenize(" ")).toEqual([])
        expect(tokenize("")).toEqual([])
    })

    test("consecutive separators don't create empty tokens", () => {

        expect(tokenize("hello---world")).toEqual(["hello---world"])
        expect(tokenize("hello!!!world")).toEqual(["hello", "world"])
    })

    test("boundary cases with allowed puncuation", () => {
        expect(tokenize("#")).toEqual([])
        expect(tokenize("#1")).toEqual(["#1"])
        expect(tokenize("---")).toEqual([])
        expect(tokenize("---a")).toEqual(["---a"])
    })
});

  