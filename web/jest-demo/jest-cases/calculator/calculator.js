const is_number = (...args) => {
  args.forEach(x => {
    if (typeof x !== 'number') {
      throw new Error('Invalid input');
    }
  });
  return true;
}

const calculator = (() => {
  const add = (a, b) => is_number(a, b) ? a + b : null;
  const subtract = (a, b) => is_number(a, b) ? a - b : null;
  const divide = (a, b) => is_number(a, b) ? a / b : null;
  const multiply = (a, b) => is_number(a, b) ? a * b : null;
  
  return {add, subtract, divide, multiply};
})();

module.exports = calculator;


