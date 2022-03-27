const reverse_str = require('./reverse_string');


test('Basic functionality', () => {
  expect(reverse_str('does tHis work?')).toBe('?krow siHt seod');
  expect(reverse_str('random stuff .^+:GT^%53ge+^%&/\\')).toBe('\\/&%^+eg35%^TG:+^. ffuts modnar');
});


test('Invalid input', () => {
  // Empty or falsy values.
  expect(reverse_str('')).toBe('');
  expect(() => reverse_str(null)).toThrow('Invalid input');
  expect(() => reverse_str()).toThrow('Invalid input');

  // Numbers or floats.
  expect(() => reverse_str(123)).toThrow('Invalid input');
  expect(() => reverse_str(123.242)).toThrow('Invalid input');
});