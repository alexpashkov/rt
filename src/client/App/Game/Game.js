/* eslint react/prop-types: 0 */ // prop-actionTypes are set in the container component
import React from 'react';
import GameBoard from './GameBoard/GameBoard';

const Game = ({ userBoard = null }) => <GameBoard board={userBoard} />;

export default Game;
