import { Observable } from "rxjs";
import socket from "../../socket";
import { server as serverEvents } from "../../../shared/types";

import gameInfoAT from "../../actions/game-info";

export default () =>
  Observable.create(observer => {
    const gameStartHandler = () => {
      observer.next({
        type: gameInfoAT.SET_STARTED,
        payload: true
      });
    };

    socket.on(serverEvents.GAME_STARTED, gameStartHandler);
    return () =>
      socket.removeListener(serverEvents.GAME_STARTED, gameStartHandler);
  });
