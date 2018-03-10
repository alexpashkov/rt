export const types = {
  GAME_META_SET_LOADING: "GAME_META_SET_LOADING",
  GAME_META_UNSET_LOADING: "GAME_META_UNSET_LOADING"
};

export const gameMetaSetLoading = () => ({
  type: types.GAME_META_SET_LOADING
});

export const gameMetaUnsetLoading = () => ({
  type: types.GAME_META_UNSET_LOADING
});
