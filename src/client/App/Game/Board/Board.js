import React from 'react';
import styled from 'react-emotion';
import {Wrapper, Row, Cell} from "./styled";

const Board = ({ board }) =>
  board && (
    <Wrapper>
      {board.map((row, y) => (
        <Row key={y}>
          {row.map((cell, x) => <Cell key={x} cellVal={cell} />)}
        </Row>
      ))}
    </Wrapper>
  );

export default Board;
