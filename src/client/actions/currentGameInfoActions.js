export const actionTypes = {
  ADD_CHAT_MESSAGE: 'CURRENT_GAME_ADD_CHAT_MESSAGE',
  SET_INFO: 'CURRENT_GAME_INFO_SET_INFO'
};

export const addChatMessage = message => ({
  type: actionTypes.ADD_CHAT_MESSAGE,
  payload: message
});

export const setInfo = info => ({
  type: actionTypes.SET_INFO,
  payload: info
});
