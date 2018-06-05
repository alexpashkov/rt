import { actionTypes } from '../actions/userActions';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.SET_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;