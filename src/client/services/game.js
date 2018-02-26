import * as axios from "axios";

export const getGames = () => axios.get("/api/games");

export const createGame = () => axios.post("/api/games");
