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
  client as clientEvents
  // server as serverEvents
} from "../../../shared/types";

import { getRandomPieceCode } from "../../services/piece"; /* TODO Remove later */

class Game extends Component {
  render() {
    // const { board, isLoading } = this.props;
    return (<GameLobby />);
  }
// {/*<div className={getGameClassName(isLoading)}>*/}
// {/*{isLoading ? <Loader /> : <Board board={board} />}*/}
// {/*</div>*/}

  componentDidMount() {
    const {
      socket,
      match: { params: { id } },
      history,
      gameInfoSet,
      gameInfoSetLoading,
      gameInfoUnsetLoading
    } = this.props;
    /* Show spinner: */
    gameInfoSetLoading();
    /* Try to join game: */
    socket.emit(clientEvents.GAME_JOIN, { id }, ({status, gameInfo}) => {
      if (status !== "success")
        return history.push("/"); /* Redirect to lobby on fail */
      gameInfoUnsetLoading();
      gameInfoSet(gameInfo);
    });
    document.addEventListener("keyup", this.handleKeyPresses);
    this.props.pieceCreate(getRandomPieceCode());
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
    const { socket, match: { params: { id } } } = this.props;
    document.removeEventListener("keyup", this.handleKeyPresses);
    socket.emit(clientEvents.GAME_LEAVE, { id });
  }
}

function getGameClassName(isLoading) {
  return "game " + (isLoading ? "game--loading" : "");
}

export default connect(
  state => ({
    board: boardSelector(state),
    isLoading: state.game.info.isLoading,
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
    gameInfoUnsetLoading,
  }
)(withSocket(Game));
