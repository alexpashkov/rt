import React from "react";
import "./styles.scss";

const GameItem = ({ id, players, inProgress }) => (
  <article className="game-item">
    <h1 className="game-item__cell game-item__title">Game {id}</h1>
    {players && (
      <div className="game-item__cell game-item__players">{`${
        players.length
      } players: ${players.join(", ")}`}</div>
    )}
    <span className="game-item__cell game-item__status">
      {inProgress ? "Playing" : "Waiting"}
    </span>
    <div className="game-item__cell">
      <button disabled={inProgress}>Join</button>
    </div>
  </article>
);

export default GameItem;
