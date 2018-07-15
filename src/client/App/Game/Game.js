/* eslint react/prop-types: 0 */ // prop-actionTypes are set in the container component
import React from 'react';
import Board from './Board/Board';
import Spectres from './Spectres';
import { Wrapper } from './styled';

const Game = ({ userBoard = null, spectres }) => (
  <Wrapper>
    <Board board={userBoard} />
    <Spectres spectres={spectres} />
  </Wrapper>
);

export default Game;
