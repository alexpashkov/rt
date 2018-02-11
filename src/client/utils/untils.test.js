import { numToString, numToBinary16String } from "./index";

describe("numToString", () => {
  test("Converts a number to a string of specified length", () => {
    expect(numToString(1, 5, 1).length).toBe(1);
    expect(numToString(1, 5, 5).length).toBe(5);
    expect(numToString(1, 5, 10).length).toBe(10);
  });
});

describe("numToBinary16String", () => {
  test("Converts a number to string of length 16 (if number can be represented in 16 bits it)", () => {
    expect(numToBinary16String(0).length).toBe(16);
    expect(numToBinary16String(5).length).toBe(16);
    expect(numToBinary16String(1213).length).toBe(16);
    // Number takes more than 16 bits to represent
    expect(numToBinary16String(1213123123).length).toBeGreaterThan(16);
  });
  test("Converts number to binary representation of length 16", () => {
    expect(numToBinary16String(0x44c0)).toBe("0100010011000000");
  });
});
