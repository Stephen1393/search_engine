const tokenize = txt => {
    const token = [] //empty array
    const lower = txt.toLowerCase() //to lowercase
    const nontokens = txt.split(/[^a-z]+/) //split non-words

    for (let i = 0; i < nontokens.length; i++) {
        const piece = nontokens[i] 
        if (piece !== "") {  //push pieces if not empty
            token.push(piece)
        }
    }
    return token
}