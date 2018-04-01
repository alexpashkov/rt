import * as gameInfoActions from "../actions/game-info";

export default (state = {}, action) => {
  switch (action.type) {
    case gameInfoActions.types.GAME_INFO_SET:
      return action.payload;
    case gameInfoActions.types.GAME_INFO_SET_LOADING:
      return { ...state, isLoading: true };
    case gameInfoActions.types.GAME_INFO_UNSET_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
