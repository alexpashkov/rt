import React from "react";
import { connect } from "react-redux";

import Board from "../../components/Board";
import * as pieceActions from "../../actions/piece";
import { boardSelector } from "./selectors";
import io from "socket.io-client";
import * as gamesService from "../../services/games";
import Loader from "../../components/Loader";
import "./styles.scss"

import { getRandomPieceCode } from "../../services/piece"; // TODO Remove later

class Game extends React.Component {
  componentWillMount = () => {
    // gamesService
    //   .getGames(this.props.match.params.id)
    //   .then(({ data: { id } }) => {
    //     this.socket = io(`/${id}`);
    //   })
    //   .catch(err => this.props.history.push("/"));
    this.props.pieceCreate(getRandomPieceCode()); // TODO Remove later
    document.addEventListener("keyup", this.handleKeyPress);
  };

  componentWillUnmount = () => {
    document.removeEventListener("keyup", this.handleKeyPress);
    this.socket && this.socket.disconnect();
  };

  putRandomPiece = () => this.props.pieceCreate(getRandomPieceCode());

  handleKeyPress = evt => {
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
    return <div className="game">{true ? <Loader /> : <Board board={board} />}</div>;
  }
}

export default connect(
  state => ({
    board: boardSelector(state)
  }),
  pieceActions
)(Game);
