import { actionTypes, setBoard, clearBoards } from "../boardsActions";

describe("boardActions", () => {
  describe("setBaord", () => {
    it("returns correct action", () => {
      const playerId = "palyerId";
      const board = [[[]]];
      expect(setBoard(playerId, board)).toEqual({
        type: actionTypes.SET_BOARD, payload: {
          playerId, board
        }
      })
    });
  });
  describe("clearBoards", () => {
    it("returns correct action", () => {
      expect(clearBoards()).toEqual({
        type: actionTypes.CLEAR_BOARDS
      })
    });
  });
});