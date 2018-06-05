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
const Game = ({ gameId }) => <div>{gameId}</div>;

Game.propTypes = {
  gameId: PropTypes.string.isRequired
};

export default Game;
