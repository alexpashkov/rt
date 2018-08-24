/* eslint react/prop-types: 0 */ // prop-actionTypes are set in the container component
import React from 'react';
import Board from './Board/Board';
import Spectres from './Spectres';
import {
  Wrapper,
  BoardWrapper,
  SpectresWrapper
} from './styled';
import NextPiece from "./NextPiece";

const Game = ({ userBoard = null, nextPiece, spectres, }) => (
  <Wrapper>
    <BoardWrapper>
      <Board board={userBoard} />
    </BoardWrapper>
    <div css={`
      flex-grow: 1;
    `}>
      <NextPiece piece={nextPiece}/>
      <SpectresWrapper>
        <Spectres spectres={spectres} />
      </SpectresWrapper>
    </div>
  </Wrapper>
);

export default Game;
