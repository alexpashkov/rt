import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import withSocket from "../../hocs/with-socket";
import Board from "../../components/Board";
import {
  pieceCreate,
  pieceMoveLeft,
  pieceMoveRight,
  pieceMoveDown,
  pieceRotate
} from "../../actions/piece";
import {
  gameMetaSetLoading,
  gameMetaUnsetLoading
} from "../../actions/game-meta";
import { boardSelector } from "./selectors";
import "./styles.scss";
import { GAME_JOIN } from "../../events";

import { getRandomPieceCode } from "../../services/piece"; // TODO Remove later

class Game extends Component {
  componentWillMount = () => {
    const {
      socket,
      match,
      history,
      gameMetaSetLoading,
      gameMetaUnsetLoading
    } = this.props;
    gameMetaSetLoading();
    socket.emit(
      GAME_JOIN,
      {
        id: match.params.id
      },
      res => {
        if (res.status !== "success") {
          console.warn(
            `Failed to join a game: ${JSON.stringify(res, null, 2)}`
          );
          history.push("/");
        }
        setTimeout(() => gameMetaUnsetLoading(), 500);
      }
    );
  };
  componentDidMount = () => {
    document.addEventListener("keyup", this.handleKeyPresses);
    this.putRandomPiece();
  };

  componentWillUnmount = () => {
    document.removeEventListener("keyup", this.handleKeyPresses);
  };

  putRandomPiece = () => this.props.pieceCreate(getRandomPieceCode());

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

  render() {
    const { board, isLoading } = this.props;
    return (
      <div className="game">
        {isLoading ? <p>Loading...</p> : <Board board={board} />}
      </div>
    );
  }
}

export default connect(
  state => ({
    board: boardSelector(state),
    isLoading: state.game.meta.isLoading
  }),
  {
    pieceCreate,
    pieceMoveLeft,
    pieceMoveRight,
    pieceMoveDown,
    pieceRotate,
    gameMetaSetLoading,
    gameMetaUnsetLoading
  }
)(withSocket(Game));
