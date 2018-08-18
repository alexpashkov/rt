const validator = require('../validator');
const blockCodes = require('../block-codes');

describe('piece movement validator', () => {
  const emptyBoard = Array.from(Array(20)).fill(
    Array(10).fill(blockCodes.BLOCK_FREE)
  );
  const basicPiece = { code: 0xc440, x: 5, y: 10 };
  const noMovement = { x: 0, y: 0 };

  const _ = blockCodes.BLOCK_FREE;
  const B = blockCodes.BLOCK_RED;
  const semiFilledBoard = [
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, B, _, B, _, B, B, _, _],
    [B, B, B, B, B, B, B, B, B, B],
    [B, B, B, B, B, B, B, B, B, B]
  ];
  it("doesn't throw", () => {
    validator(emptyBoard, basicPiece, { x: 0, y: 0 });
  });

  describe('return true if movement is valid', () => {
    it('allows to place piece at the middle of empty board with object direction', () => {
      expect(validator(emptyBoard, basicPiece, noMovement)).toBe(true);
    });

    it('allows to use string directions', () => {
      const nearLPiece = { code: 0x2600, y: 14, x: 4 };
      const nearTPiece = { code: 0x0640, y: 14, x: 2 };

      expect(validator(emptyBoard, basicPiece, 'left')).toBe(true);
      expect(validator(emptyBoard, basicPiece, 'right')).toBe(true);
      expect(validator(emptyBoard, basicPiece, 'down')).toBe(true);

      expect(validator(semiFilledBoard, nearLPiece, 'left')).toBe(true);
      expect(validator(semiFilledBoard, nearLPiece, 'right')).toBe(true);
      expect(validator(semiFilledBoard, nearLPiece, 'down')).toBe(true);
    });

    it('allows to use object directions', () => {
      expect(validator(emptyBoard, basicPiece, { x: 1, y: 2 })).toBe(true);
      expect(validator(semiFilledBoard, basicPiece, { x: 2, y: 4 })).toBe(true);
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

    it('does not allow to use invalid string directions', () => {
      expect(validator(emptyBoard, basicPiece, 'lol')).toBe(false);
      expect(validator(emptyBoard, basicPiece, 'toString')).toBe(false);
      expect(validator(emptyBoard, basicPiece, '')).toBe(false);
      expect(validator(emptyBoard, basicPiece, null)).toBe(false);
    });

    it('does not allow to place piece on busy blocks', () => {
      const testPiece = { code: 0xc440, y: 15, x: 5 };
      const testTPiece = { code: 0x640, y: 15, x: 2 };
      const testTPiece2 = { code: 0x640, y: 14, x: 1 };

      expect(validator(semiFilledBoard, testPiece, { x: 3, y: 2 })).toBe(false);
      expect(validator(semiFilledBoard, testTPiece, 'left')).toBe(false);
      expect(validator(semiFilledBoard, testTPiece, 'right')).toBe(false);
      expect(validator(semiFilledBoard, testTPiece, 'down')).toBe(false);

      expect(validator(semiFilledBoard, testTPiece2, 'left')).toBe(true);
      expect(validator(semiFilledBoard, testTPiece2, 'right')).toBe(true);
      expect(validator(semiFilledBoard, testTPiece2, 'down')).toBe(false);
    });
  });

  it('lets piece to be placed 4 blocks above the top border', () => {
    const testPiece = { code: 0xc440, y: -4, x: 5 };

    expect(validator(semiFilledBoard, testPiece, 'down')).toBe(true);
    expect(validator(semiFilledBoard, testPiece, 'left')).toBe(true);
    expect(validator(semiFilledBoard, testPiece, 'right')).toBe(true);
  });
});
