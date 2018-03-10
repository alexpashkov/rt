import * as axios from "axios";

export const createGame = () => axios.post("/api/games");
export const getGames = id => axios.get(`/api/games${id ? `/${id}` : ""}`);
