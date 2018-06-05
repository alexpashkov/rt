export const actionTypes = {
  SET_DATA: "USER_SET_DATA"
};

export const setData = data => ({
  type: actionTypes.SET_DATA,
  payload: data
});
