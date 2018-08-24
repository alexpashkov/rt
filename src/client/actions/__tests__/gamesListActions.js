import { actionTypes, setList } from "../gamesListActions";

it("returns correct action", () => {
  expect(setList).toBeTruthy();
  expect(setList([1, 2, 3])).toEqual({
    type: actionTypes.SET_LIST,
    payload: [1, 2, 3]
  })
});