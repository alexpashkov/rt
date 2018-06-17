import React from 'react';
import styled from 'react-emotion';

const Cell = styled.div`
  border: 1px solid red;
  width: 10%;
  padding-top: 10%;
  background-color: ${({ filled, theme }) =>
    filled ? theme.colors.accent : '#eee'};
`;

const Row = styled.div`
  display: flex;
  height: 5%;
`;
const BoardWrapper = styled.div`
  width: 100%;
  align-self: flex-start;
  max-width: 400px;
`;

const GameBoard = ({ board }) =>
  board && (
    <BoardWrapper>
      {board.map((row, y) => (
        <Row key={y}>
          {row.map((cell, x) => <Cell key={x} filled={cell} />)}
        </Row>
      ))}
    </BoardWrapper>
  );

export default GameBoard;
