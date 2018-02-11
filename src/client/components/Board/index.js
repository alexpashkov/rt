import React from "react";

import "./board.css";

const Board = ({ board }) => (
  <div className="board">
    {board.map((row, i) => (
      <div key={i} className="board__row">
        {row.map((cell, j) => (
          <div
            key={j}
            className={"board__cell" + (cell ? " board__cell--filled" : "")}
          />
        ))}
      </div>
    ))}
  </div>
);

export default Board;
