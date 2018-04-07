const types = {
  GAME_APPEND_CHAT_MESSAGE: "GAME_APPEND_CHAT_MESSAGE"
};

export const appendChatMessage = message => ({
  type: types.GAME_APPEND_CHAT_MESSAGE,
  payload: message
});


export default types;