import React from 'react';
import styled from 'react-emotion';
import { Row, Cell } from './styled';

const Board = ({ board }) =>
  board && (
    <div>
      {board.map((row, y) => (
        <Row key={y}>
          {row.map((cell, x) => <Cell key={x} cellVal={cell} />)}
        </Row>
      ))}
    </div>
  );

export default Board;
