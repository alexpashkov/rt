import React from 'react';
import PropTypes from 'prop-types';

const Game = ({ gameId }) => <div>{gameId}</div>;

Game.propTypes = {
  gameId: PropTypes.string.isRequired
};

export default Game;
