function reverse_str(text) {
    if (typeof text !== 'string') {
        throw new Error('Invalid input');
    }
    return [...text].reverse().join('');
}


module.exports = reverse_str;
  
  