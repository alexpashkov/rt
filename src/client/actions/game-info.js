export const types = {
  GAME_INFO_SET: "GAME_INFO_SET",
  GAME_INFO_SET_LOADING: "GAME_INFO_SET_LOADING",
  GAME_INFO_UNSET_LOADING: "GAME_INFO_UNSET_LOADING"
};

export const gameInfoSet = gameInfo => ({
  type: types.GAME_INFO_SET,
  payload: gameInfo
});

export const gameInfoSetLoading = () => ({
  type: types.GAME_INFO_SET_LOADING
});

export const gameInfoUnsetLoading = () => ({
  type: types.GAME_INFO_UNSET_LOADING
});
