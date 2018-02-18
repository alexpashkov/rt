import React from "react";

const GameItem = ({ id, inProgress }) => (
  <article className="game-item">
    <h1 className="game-item__title">Game {id}</h1>
    <span className="game-item__status">{inProgress ? "Playing" : "Waiting"}</span>
    <button>{inProgress ? "Watch" : "Join"}</button>
  </article>
);

export default GameItem;
