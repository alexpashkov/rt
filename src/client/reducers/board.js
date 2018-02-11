const getInitialBoardState = () =>
  Array.from({ length: 20 }).map(() => Array.from({ length: 10 }).fill(null));

const boardReducer = (state = getInitialBoardState(), action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default boardReducer;
