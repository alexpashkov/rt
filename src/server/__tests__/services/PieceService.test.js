const PieceService = require("../../services/PieceService");

describe('PieceService', () => {
    it('does not throw', () => {
        expect(PieceService).toBeTruthy();
    });

    it('successfully rotates piece', () => {
        expect(PieceService.rotatePiece(0x2222)).toBe(0x00f0);
    });

    it('generates random piece', () => {
        expect(PieceService.generateRandomPiece()).toBeTruthy();
    });
});