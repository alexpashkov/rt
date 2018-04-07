import React from "react";
import "./styles.scss";
import { prop } from "ramda";

const getPlayersInfo = players =>
  Boolean(players && players.length) &&
  `${players.length} players: ${players.map(prop("login")).join(", ")}`;

const GameItem = ({ id, players, isRunning, handleJoin }) => {
  return (
    <article className="game-item">
      <h1 className="game-item__cell game-item__title">Game {id}</h1>
      <div className="game-item__cell game-item__players">
        {getPlayersInfo(players) || "No players"}
      </div>
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
  );
};

export default GameItem;
