export const actionTypes = {
  SET_INFO: 'CURRENT_GAME_INFO_SET_INFO'
};

export const setInfo = info => ({
  type: actionTypes.SET_INFO,
  payload: info
});
