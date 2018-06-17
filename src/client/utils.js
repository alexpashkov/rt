import * as R from "ramda";
import padStart from "lodash/padStart";

export const numToString = (num, radix, length = num.length) => {
    const numString = num.toString(radix);
    return padStart(numString, length, "0");
};

export const numToBinary16String = num => numToString(num, 2, 16);

export const queryStringWith = R.curry((f, params) =>
    Object.keys(params).reduce((queryString, name) => {
        const value = f(params[name]);
        return value ? queryString + `&${name}=${value}` : queryString;
    }, "?")
);

export const queryString = queryStringWith(R.identity);
