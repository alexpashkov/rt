/* eslint react/prop-types: 0 */ // prop-actionTypes are set in the container component
import React from 'react';
import Board from './Board/Board';
import Spectres from './Spectres';
import { Wrapper, BoardWrapper, SpectresWrapper } from './styled';

const Game = ({ userBoard = null, spectres }) => (
  <Wrapper>
    <BoardWrapper>
      <Board board={userBoard} />
    </BoardWrapper>
    <SpectresWrapper>
      <Spectres spectres={spectres} />
    </SpectresWrapper>
    {/*<audio*/}
    {/*src="https://www.bensound.com/bensound-music/bensound-epic.mp3"*/}
    {/*loop*/}
    {/*autoPlay*/}
    {/*/>*/}
  </Wrapper>
);

export default Game;
