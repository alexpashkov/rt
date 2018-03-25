import React, { Component } from "react";
import { connect } from "react-redux";
import withSocket from "../../hocs/with-socket";
import Board from "../../components/Board";
import {
  pieceCreate,
  pieceMoveLeft,
  pieceMoveRight,
  pieceMoveDown,
  pieceRotate
} from "../../actions/piece";
import { boardSelector } from "./selectors";
import "./styles.scss";
import { GAME_JOIN } from "../../events";

import { getRandomPieceCode } from "../../services/piece"; // TODO Remove later

class Game extends Component {
  componentWillMount = () => {
    const { socket, match } = this.props;
    socket.emit(
      GAME_JOIN,
      {
        id: match.params.id
      },
      res => {
        console.log(res);
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
    const { board } = this.props;
    return (
      <div className="game">
        <Board board={board} />
      </div>
    );
  }
}

export default connect(
  state => ({
    board: boardSelector(state)
  }),
  {
    pieceCreate,
    pieceMoveLeft,
    pieceMoveRight,
    pieceMoveDown,
    pieceRotate
  }
)(withSocket(Game));
