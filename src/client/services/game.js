import * as axios from "axios";

class GameService {
  static getGames() {
    return axios.get("/api/games");
  }

  static createGame() {
    return axios.post("/api/games");
  }
}

export default GameService;
