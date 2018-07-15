import React from 'react';
import styled from 'react-emotion';
import {BoardWrapper, Row, Cell} from "./styled";

const GameBoard = ({ board }) =>
  board && (
    <BoardWrapper>
      {board.map((row, y) => (
        <Row key={y}>
          {row.map((cell, x) => <Cell key={x} cellVal={cell} />)}
        </Row>
      ))}
    </BoardWrapper>
  );

export default GameBoard;
