// tokenizer v1: lowercase letters and numbers. (a-z) (0-9)

const tokenize = txt => {
    const token = [] 
    const lower = txt.toLowerCase() 
    const nontokens = txt.split(/[^a-z0-9]+/) 

    for (let i = 0; i < nontokens.length; i++) {
        const piece = nontokens[i] 
        if (piece !== "") {  
            token.push(piece)
        }
    }
    return token
}

module.export = { tokenize }