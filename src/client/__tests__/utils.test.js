import { identity } from 'ramda';
import { numToString, numToBinary16String, queryStringWith } from '../utils';

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
    it('Creates a query string from an object keys are sorted', () => {
      const timestamp = Date.now();
      const other = 'other';
      expect(
        queryStringWith(identity, {
          timestamp,
          other
        })
      ).toBe(`?other=other&timestamp=${timestamp}`);
    });
    it('filters out params that are null or undefined', () => {
      const timestamp = null,
        other = undefined;
      expect(
        queryStringWith(identity, {
          timestamp,
          other
        })
      ).toBe(`?`);
    });
    it('Applies a function to a value', () => {
      const timestamp = 5,
        other = 6;
      const pow2 = x => x * x;
      expect(
        queryStringWith(pow2, {
          timestamp,
          other
        })
      ).toBe(`?other=36&timestamp=25`);
    });
  });
});
