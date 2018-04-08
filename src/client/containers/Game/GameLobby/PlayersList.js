import React from "react";
import PropTypes from "prop-types";
import "./PlayersList.scss";

const PlayersList = ({ players = [] }) => (
  <article className="PlayersList">
    <h2>Players</h2>
    <ol className="PlayersList__list">
      {players.map(player => (
        <li key={player.login} className="PlayersList__item">
          {player.login}
        </li>
      ))}
    </ol>
  </article>
);

PlayersList.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      login: PropTypes.string
    })
  )
};

export default PlayersList;
