import React from "react";
import Board from "./Board/Board";
import {numToBinary16String} from "../../utils";
import * as R from "ramda";

const appendPrepend = R.curry((v, coll) => R.compose(R.append(v), R.prepend(v))(coll));
const emptyRow = R.range(0, 6).map(R.always(0));

const getChunks = R.curry((n, coll) => {
  let i = 0;
  const chunks = [];
  while (coll && i < coll.length) {
    chunks.push(coll.slice(i, i + n));
    i += n;
  }
  return chunks;
});

const pieceToBoard = (piece) => {
  return R.ifElse(
    Boolean,
    R.compose(
      R.map(row =>  row.map(Number)),
      getChunks(4),
      R.split(""),
      numToBinary16String
    ),
    R.always(
      [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ]
    )
  )(piece);
}

// eslint-disable-next-line
export default ({piece}) => {
  const board = pieceToBoard(piece);
  return <div css={`
    padding: 10px;
  `}>
    <h2>Next piece</h2>
    <Board board={board}/></div>;
};
