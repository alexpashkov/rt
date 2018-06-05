import React from 'react';
import PropTypes from 'prop-types';

const Game = ({ currentGameInfo }) => {
  return <pre>{JSON.stringify(currentGameInfo)}</pre>;
};

Game.propTypes = {
  currentGameInfo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    isRunning: PropTypes.bool.isRequired,
    leaderId: PropTypes.string.isRequired,
    players: PropTypes.arrayOf(
      PropTypes.shape({
        login: PropTypes.string.isRequired
      })
    ).isRequired,
    chatHistory: PropTypes.array.isRequired
  }),
  gameId: PropTypes.string.isRequired
};

export default Game;
