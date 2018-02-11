import React from 'react';
import {connect} from 'react-redux';

import Board from '../../components/Board';
import * as pieceActions from '../../actions/piece';
import {boardSelector} from './selectors';

import {getRandomPieceCode} from '../../services/piece'; // TODO Remove later

class Game extends React.Component {
  handleKeyPress = evt => {
    const {
      pieceMoveLeft,
      pieceMoveRight,
      pieceMoveDown,
      pieceRotate,
    } = this.props;
    switch (evt.code) {
      case 'ArrowLeft':
        return pieceMoveLeft();
      case 'ArrowRight':
        return pieceMoveRight();
      case 'ArrowDown':
        return pieceMoveDown();
      case 'ArrowUp':
        return pieceRotate();
    }
  };
  putRandomPiece = () => this.props.pieceCreate(getRandomPieceCode());
  componentWillMount() {
    this.props.pieceCreate(getRandomPieceCode()); // TODO Remove later
    document.addEventListener('keyup', this.handleKeyPress);
  }
  render() {
    return (
      <div>
        <Board board={this.props.board} />
      </div>
    );
  }
}

export default connect(
  state => ({
    board: boardSelector(state),
  }),
  pieceActions,
)(Game);
