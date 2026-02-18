// tokenizer v1: update: decided to include hastags, pluses and hyphens.

const tokenize = txt => {
    const lower = txt.toLowerCase() 
    const raw = lower.match(/[a-z0-9#+-]+/g) ?? []
    return raw.filter(t => /[a-z0-9]/.test(t)) 
}

module.exports = { tokenize }