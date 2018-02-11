import { getPieceCells } from "./selectors";

describe("getPieceCells ", () => {
  test("Calculates cell coordinates from piece code", () => {
    expect(getPieceCells(0x44c0)).toEqual([
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 2 }
    ]);
  });
});
