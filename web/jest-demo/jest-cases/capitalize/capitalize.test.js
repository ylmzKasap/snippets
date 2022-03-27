const capitalize = require('./capitalize');


test('Basic functionality', () => {
  expect(capitalize('does tHis work?')).toBe('Does tHis work?');
  expect(capitalize('5tarting With numbers')).toBe('5tarting With numbers');
  expect(capitalize('. starts with a dot.')).toBe('. starts with a dot.');
  expect(capitalize('random stuff .^+:GT^%53ge+^%&/\\')).toBe('Random stuff .^+:GT^%53ge+^%&/\\');
});


test('Invalid input', () => {
  // Empty or falsy values.
  expect(capitalize('')).toBe('');
  expect(() => capitalize(null)).toThrow('Invalid input');
  expect(() => capitalize()).toThrow('Invalid input');

  // Numbers or floats.
  expect(() => capitalize(123)).toThrow('Invalid input');
  expect(() => capitalize(123.242)).toThrow('Invalid input');
});