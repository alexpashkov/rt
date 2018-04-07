import React from "react";
import "./styles.scss";

const GameItem = ({ id, players, isRunning, handleJoin }) => {
  debugger;
  return <article className="game-item">
    <h1 className="game-item__cell game-item__title">Game {id}</h1>
    {/*{players && (*/}
      {/*<div className="game-item__cell game-item__players">{`${*/}
        {/*players.length*/}
      {/*} players: ${players.join(", ")}`}</div>*/}
    {/*)}*/}
    <span className="game-item__cell game-item__status">
      {isRunning ? (
        "Playing"
      ) : (
        <span>
          <i className="far fa-hourglass" /> Waiting
        </span>
      )}
    </span>
    <div className="game-item__cell game-item__cell--no-shrink">
      <button
        className="primary"
        disabled={isRunning}
        onClick={() => handleJoin(id)}
      >
        <i className="fas fa-sign-in-alt fa-fw" /> Join
      </button>
    </div>
  </article>
 };

export default GameItem;
