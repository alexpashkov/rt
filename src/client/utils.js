import * as R from 'ramda';
import padStart from 'lodash/padStart';

export const numToString = (num, radix, length = 0) => {
  const numString = num.toString(radix);
  return padStart(numString, length, '0');
};

export const numToBinary16String = num => numToString(num, 2, 16);

export const queryStringWith = R.curry((f, params) => {
  return (
    '?' +
    Object.keys(params)
      .sort()
      .map(key => {
        const val = f(params[key]);
        return val && [key, val].join('=');
      })
      .filter(v => v !== null && v !== void 0)
      .join('&')
  );
});

export const queryString = queryStringWith(R.identity);
