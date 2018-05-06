export const types = {
  SET: "GAME_INFO_SET",
  SET_LOADING: "GAME_INFO_SET_LOADING",
  UNSET_LOADING: "GAME_INFO_UNSET_LOADING",
  SET_STARTED: "GAME_INFO_SET_STARTED",
  SET_PAUSED: "GAME_INFO_SET_PAUSED"
};

export const gameInfoSet = gameInfo => ({
    type: types.SET,
    payload: gameInfo
  });

export const gameInfoSetLoading = () => ({
  type: types.SET_LOADING
});

export const gameInfoUnsetLoading = () => ({
  type: types.UNSET_LOADING
});

export const setStarted = value => ({
  type: types.SET_STARTED,
  payload: value
});

export const setPaused = value => ({
  type: types.SET_PAUSED,
  payload: value
});

export default types;
