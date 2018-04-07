import gameChatMessagesAT from "../actions/game-chat-messages";

const gameChatMessagesReducer = (state = [], action) => {
  switch (action.type) {
    case gameChatMessagesAT.GAME_APPEND_CHAT_MESSAGE:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default gameChatMessagesReducer;
