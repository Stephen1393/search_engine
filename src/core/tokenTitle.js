const tokenTitle = txt => {
      const lower = txt.toLowerCase()
      const clean = lower.replace(/\..*$/, "") 
      const raw = clean.match(/[a-z0-9]+/g) ?? []
    return raw.filter(t => /[a-z0-9]/.test(t)) 
    
}

module.exports = { tokenTitle }


