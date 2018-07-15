/* eslint react/prop-types: 0 */ // prop-actionTypes are set in the container component
import React from 'react';
import Board from './Board/Board';

const Game = ({ userBoard = null }) => <Board board={userBoard} />;

export default Game;
