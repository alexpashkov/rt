export const actionTypes = {
  ADD_CHAT_MESSAGE: 'CURRENT_GAME_ADD_CHAT_MESSAGE',
  SET_INFO: 'CURRENT_GAME_INFO_SET_INFO',
  SET_IS_RUNNING: 'CURRENT_GAME_SET_IS_RUNNING'
};

export const addChatMessage = message => ({
  type: actionTypes.ADD_CHAT_MESSAGE,
  payload: message
});

export const setInfo = info => ({
  type: actionTypes.SET_INFO,
  payload: info
});

export const setIsRunning = value => ({
  type: actionTypes.SET_IS_RUNNING,
  payload: value
});
