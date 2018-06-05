import React from 'react';
import PropTypes from 'prop-types';
import { PacmanLoader } from 'react-spinners';

export const Spinner = () => (
  <div
    css={`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    `}
  >
    <PacmanLoader color="red" />
  </div>
);
const Game = ({ currentGameInfo, gameId }) => (
  <div>
    {gameId}
    <pre>{JSON.stringify(currentGameInfo, null, 2)}</pre>
  </div>
);

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
  }).isRequired,
  gameId: PropTypes.string.isRequired
};

export default Game;
