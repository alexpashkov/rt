export const types = {
    GAMES_LIST_SET_LIST: "GAMES_LIST_SET_LIST"
};

export const setList = list => ({
    type: types.GAMES_LIST_SET_LIST,
    payload: list
});