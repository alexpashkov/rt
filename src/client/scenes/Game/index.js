/* eslint-disable prettier/prettier */
import React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import { numToBinary16String } from "../../utils/index";

import Board from "../../components/Board";
import * as pieceActions from "../../actions/piece";
import { getRandomPieceCode } from "../../services/piece";

class Game extends React.Component {
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
  putRandomPiece = () => this.props.pieceCreate(getRandomPieceCode());
  componentWillMount() {
    // FIXME remove random piece creation later
    this.props.pieceCreate(getRandomPieceCode());
    document.addEventListener("keyup", this.handleKeyPress);
  }
  render() {
    return (
      <div>
        <button onClick={this.putRandomPiece}>R</button>
        <Board board={this.props.board} />{" "}
      </div>
    );
  }
}

export default connect(
  state => ({
    board: boardSelector(state)
  }),
  pieceActions
)(Game);

const boardSelector = createSelector(
  state => state.game.board,
  state => state.game.piece,
  (board, piece) => {
    if (!piece) {
      return board;
    }
    const pieceCells = getPieceCells(piece.code);
    return board.map(
      (row, y) =>
        pieceCells.find(cell => cell.y + piece.y === y)
          ? row.map(
              (cell, x) =>
                !!pieceCells.find(
                  cell => cell.x + piece.x === x && cell.y + piece.y === y
                )
            )
          : row
    );
  }
);

export const getPieceCells = pieceCode =>
  numToBinary16String(pieceCode)
    .split("")
    .reduce(
      (acc, curr, i) =>
        curr === "1"
          ? [
              ...acc,
              {
                x: i % 4,
                y: Math.floor(i / 4)
              }
            ]
          : acc,
      []
    );
