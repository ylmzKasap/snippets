function capitalize(text) {
    if (typeof text !== 'string') {
        throw new Error('Invalid input');
    }
    return text.charAt(0).toUpperCase() + text.slice(1,)
}


module.exports = capitalize;
  
  