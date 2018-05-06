import React, { Component } from "react";
import { connect } from "react-redux";
import withSocket from "../../hocs/with-socket";
import Board from "../../components/Board";
import Loader from "../../components/Loader";
import GameLobby from "./GameLobby";

import {
  pieceCreate,
  pieceMoveLeft,
  pieceMoveRight,
  pieceMoveDown,
  pieceRotate
} from "../../actions/piece";
import {
  gameInfoSet,
  gameInfoSetLoading,
  gameInfoUnsetLoading
} from "../../actions/game-info";
import { boardSelector } from "./selectors";
import "./styles.scss";
import {
  client as clientSocketEvents,
  server as serverSocketEvents
} from "../../../shared/types";

import { getRandomPieceCode } from "../../services/piece"; /* TODO Remove later */

class Game extends Component {
  render() {
    const { board, isLoading, isStarted, isPaused } = this.props;

    if (isLoading) return <Loader />;

    return !isStarted ? (
      <GameLobby />
    ) : (
      <div className={getGameClassName(isLoading)}>
        {<Board board={board} />}
      </div>
    );
  }

  componentDidMount() {
    const {
      socket,
      match: { params: { id } },
      history,
      gameInfoSet,
      gameInfoSetLoading,
      gameInfoUnsetLoading,
      pieceCreate
    } = this.props;
    /* Show spinner: */
    gameInfoSetLoading();
    /* Try to join game: */
    socket.on(serverSocketEvents.GAME_INFO_UPDATE, gameInfoSet);

    socket.emit(
      clientSocketEvents.GAME_JOIN,
      { id },
      ({ status, gameInfo }) => {
        if (status !== "success")
          return history.push("/"); /* Redirect to lobby on failure */
        gameInfoUnsetLoading();
        gameInfoSet(gameInfo);
      }
    );
    document.addEventListener("keyup", this.handleKeyPresses);
    pieceCreate(getRandomPieceCode());
  }

  handleKeyPresses = evt => {
    const {
      pieceMoveLeft,
      pieceMoveRight,
      pieceMoveDown,
      pieceRotate
    } = this.props;
    switch (evt.code) {
      case "ArrowLeft":
        return pieceMoveLeft();
      case "ArrowRight":
        return pieceMoveRight();
      case "ArrowDown":
        return pieceMoveDown();
      case "ArrowUp":
        return pieceRotate();
    }
  };

  componentWillUnmount() {
    const { socket, gameInfoSet, match: { params: { id } } } = this.props;
    document.removeEventListener("keyup", this.handleKeyPresses);
    socket.removeListener(serverSocketEvents.GAME_INFO_UPDATE, gameInfoSet);
    socket.emit(clientSocketEvents.GAME_LEAVE, { id });
  }
}

function getGameClassName(isLoading) {
  return "game " + (isLoading ? "game--loading" : "");
}

export default connect(
  state => ({
    board: boardSelector(state),
    isLoading: state.game.info.isLoading,
    isStarted: state.game.info.isStarted,
    isPaused: state.game.info.isPaused,
    leaderId: state.game.info.leaderId
  }),
  {
    pieceCreate,
    pieceMoveLeft,
    pieceMoveRight,
    pieceMoveDown,
    pieceRotate,
    gameInfoSet,
    gameInfoSetLoading,
    gameInfoUnsetLoading
  }
)(withSocket(Game));
