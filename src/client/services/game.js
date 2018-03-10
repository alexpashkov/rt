import * as axios from "axios";

export const createGame = () => axios.post("/api/games");
export const getGames = () => axios.get("/api/games");
