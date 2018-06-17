/* eslint react/prop-types: 0 */ // prop-types are set in the container component
import React from 'react';
import GameBoard from './GameBoard/GameBoard';

const Game = ({ board = null }) => <GameBoard board={board} />;

export default Game;
