import {actionTypes, addChatMessage, setInfo, setIsRunning } from "../currentGameInfoActions"

it("returns correct actions", () => {
  expect(addChatMessage("message")).toEqual({
    type: actionTypes.ADD_CHAT_MESSAGE,
    payload: "message"
  });
  expect(setInfo("info")).toEqual({
    type: actionTypes.SET_INFO,
    payload: "info"
  });
  expect(setIsRunning(true)).toEqual({
    type: actionTypes.SET_IS_RUNNING,
    payload: true
  });
});