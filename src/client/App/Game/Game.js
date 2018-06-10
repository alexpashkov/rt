/* eslint react/prop-types: 0 */ // prop-types are set in the container component
import React from 'react';
import GameBoard from './GameBoard/GameBoard';

const board = Array.from(new Array(20)).fill(Array.from(new Array(10)));

const Game = ({ currentGameInfo }) => <GameBoard board={board} />;

export default Game;
