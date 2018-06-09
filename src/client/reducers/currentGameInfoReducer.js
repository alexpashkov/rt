import { actionTypes } from '../actions/currentGameInfoActions';

const currentGameInfoReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.ADD_CHAT_MESSAGE:
      return {
        ...state,
        chatHistory: [...state.chatHistory, action.payload]
      };
    case actionTypes.SET_INFO:
      return action.payload;
    case actionTypes.SET_IS_RUNNING:
      return {
        ...state,
        isRunning: action.payload
      }
    default:
      return state;
  }
};

export default currentGameInfoReducer;
