import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { types as gamesActionTypes } from "../actions/games";
import GameService from "../services/games";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* gameCreate(action) {
  try {
    const game = yield call(GameService.createGame);
    yield put({ type: "USER_FETCH_SUCCEEDED", user: user });
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}
function* gameCreateSaga() {
  yield takeLatest(gamesActionTypes.GAME_CREATE_REQUEST, gameCreate);
}

export default mySaga;
