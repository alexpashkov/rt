import { combineEpics } from "redux-observable";
import { Observable } from "rxjs";
import socket from "../../socket";
import { server as serverEvents } from "../../../shared/types";
import { compose, bind } from "ramda";

import gameInfoAT from "../../actions/game-info";
import {pieceSet, types as gamePieceAT } from "../../actions/piece";

const gameStartedEpic = () =>
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

const gamePieceUpdate = () =>
    Observable.create(observer =>
      socket.on(serverEvents.GAME_PIECE_UPDATE, compose(observer.next.bind(observer), pieceSet)),
      () => socket.removeListener(serverEvents.GAME_PIECE_UPDATE, gameStartHandler)
    );

export default combineEpics(gameStartedEpic, gamePieceUpdate);
