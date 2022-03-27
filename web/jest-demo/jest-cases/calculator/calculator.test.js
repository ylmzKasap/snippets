const calculator = require('./calculator');


test('Basic functionality', () => {
  expect(calculator.add(2, 2)).toBe(4);
  expect(calculator.subtract(5, 2)).toBe(3);
  expect(calculator.divide(10, 2)).toBe(5);
  expect(calculator.multiply(8, 7)).toBe(56);
});

test('Invalid input', () => {
  // Empty or falsy values.
  expect(() => calculator.add()).toThrow('Invalid input');
  expect(() => calculator.add(5)).toThrow('Invalid input');
  expect(() => calculator.add(5, '5')).toThrow('Invalid input');
  expect(() => calculator.add(null, 7)).toThrow('Invalid input');
});

test('Floats', () => {
  expect(calculator.add(5.2, 7.3)).toBe(12.5);
  expect(calculator.add(0.1, 0.2)).toBeCloseTo(0.3);
});