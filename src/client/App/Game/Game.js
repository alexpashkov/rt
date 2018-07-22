/* eslint react/prop-types: 0 */ // prop-actionTypes are set in the container component
import React from 'react';
import Board from './Board/Board';
import Spectres from './Spectres';
import {
  Wrapper,
  JumboWithBoard,
  BoardWrapper,
  SpectresWrapper
} from './styled';

const Game = ({ userBoard = null, spectres }) => (
  <Wrapper>
    <BoardWrapper>
      <Board board={userBoard} />
    </BoardWrapper>
    <SpectresWrapper>
      <Spectres spectres={spectres} />
    </SpectresWrapper>
  </Wrapper>
);

export default Game;
