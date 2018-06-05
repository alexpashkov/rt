export const actionTypes = {
    SET_LIST: "GAMES_LIST_SET_LIST"
};

export const setList = list => ({
    type: actionTypes.SET_LIST,
    payload: list
});