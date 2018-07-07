const validator = require('./validator');
const blockCodes = require('./block-codes');

describe('piece movement validator', () => {
  const emptyBoard = Array.from(Array(20)).fill(
    Array(10).fill(blockCodes.BLOCK_FREE)
  );
  const basicPiece = { code: 0xc440, x: 5, y: 10 };
  const noMovement = { x: 0, y: 0 };

  it("doesn't throw", () => {
    validator(emptyBoard, basicPiece, { x: 0, y: 0 });
  });

  describe('return true if movement is valid', () => {
    it('allows to place piece at the middle of empty board with object direction', () => {
      expect(validator(emptyBoard, basicPiece, noMovement)).toBe(true);
    });
  });

  describe('return false if movement is invalid', () => {
    it('does not allow out of border placement', () => {
      const outOfBorderPieceY = { code: 0xc440, x: 0, y: 18 };
      const outOfBorderPieceX = { code: 0xc440, x: 9, y: 5 };

      expect(validator(emptyBoard, outOfBorderPieceY, noMovement)).toBe(false);
      expect(validator(emptyBoard, outOfBorderPieceX, noMovement)).toBe(false);
    });

    it('does not allow out of border movement', () => {
      expect(validator(emptyBoard, basicPiece, { x: 4, y: 0 })).toBe(false);
    });
  });
});
