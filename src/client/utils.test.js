import { numToString, numToBinary16String, queryStringWith } from './utils';

describe('utils', () => {
  describe('numToString', () => {
    it(
      'converts a number to string of specified radix and length,' +
        'pads with zeroes if necessary',
      () => {
        expect(numToString(2, 2)).toBe('10');
        expect(numToString(2, 2, 5)).toBe('00010');
      }
    );
  });
  describe('numToBinary16String', () => {
    it(
      'converts a number to binary representation in string format, always 16 length,' +
        'pads with zeroes if necessary',
      () => {
        expect(numToBinary16String(2, 2)).toBe('0000000000000010');
        expect(numToBinary16String(2, 2, 5)).toBe('0000000000000010');
      }
    );
  });
  describe('queryStringWith', () => {
    it('Creates a query string from an object, applies a function to a value, keys are sorted', () => {
      const identity = v => v;
      const timestamp = Date.now();
      const other = 'other';
      expect(
        queryStringWith(identity, {
          timestamp,
          other
        })
      ).toBe(`?other=other&timestamp=${timestamp}`);
    });
  });
});
