import padStart from "lodash/padStart";

export const numToString = (num, radix, length = num.length) => {
  const numString = num.toString(radix);
  return padStart(numString, length, "0");
};

export const numToBinary16String = num => numToString(num, 2, 16);
