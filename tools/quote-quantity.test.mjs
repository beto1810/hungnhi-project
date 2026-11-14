import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeQuantity, addQuoteQuantity, normalizeQuote } from '../src/quoteQuantity.js';

test('quantities are bounded positive whole numbers', () => {
  for (const input of ['', 0, -2, 'invalid', Infinity, NaN]) assert.equal(normalizeQuantity(input), 1);
  assert.equal(normalizeQuantity('12'), 12);
  assert.equal(normalizeQuantity(2.8), 2);
  assert.equal(normalizeQuantity(10000), 9999);
});

test('adds selected quantity and merges repeat additions without mutating other lines', () => {
  const original = [{ id: 'a', quantity: 3 }, { id: 'b', quantity: 2 }];
  assert.deepEqual(addQuoteQuantity([], 'a', 3), [{ id: 'a', quantity: 3 }]);
  assert.deepEqual(addQuoteQuantity(original, 'a', 2), [{ id: 'a', quantity: 5 }, { id: 'b', quantity: 2 }]);
  assert.equal(original[0].quantity, 3);
  assert.equal(addQuoteQuantity([{ id: 'a', quantity: 9998 }], 'a', 3)[0].quantity, 9999);
});

test('restores valid lines, merges duplicates and discards unknown products', () => {
  const products = [{ id: 'a' }, { id: 'b' }];
  assert.deepEqual(normalizeQuote([{id:'a',quantity:3},{id:'a',quantity:2},{id:'b',quantity:-2},{id:'unknown',quantity:5},null], products), [{id:'a',quantity:5},{id:'b',quantity:1}]);
  assert.deepEqual(normalizeQuote({}, products), []);
});
