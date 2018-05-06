import * as gameInfoActions from "../actions/game-info";

export default (state = {}, action) => {
  switch (action.type) {
    case gameInfoActions.types.SET:
      return action.payload;
    case gameInfoActions.types.SET_LOADING:
      return { ...state, isLoading: true };
    case gameInfoActions.types.UNSET_LOADING:
      return { ...state, isLoading: false };
    case gameInfoActions.types.SET_STARTED:
      return {
        ...state, isStarted: action.payload
      };
    case gameInfoActions.types.SET_PAUSED:
      return {
        ...state, isPaused: action.payload
      };
    default:
      return state;
  }
};
