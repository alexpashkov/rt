import * as gameMetaActions from "../actions/game-meta";

export default (state = {}, action) => {
  switch (action.type) {
    case gameMetaActions.types.GAME_META_SET_LOADING:
      return { ...state, isLoading: true };
    case gameMetaActions.types.GAME_META_UNSET_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
