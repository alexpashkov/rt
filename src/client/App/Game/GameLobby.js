/* eslint react/prop-types: 0 */ // prop-types are set in the container component
import React from 'react';

const GameLobby = ({ currentGameInfo }) => (
  <pre>{JSON.stringify(currentGameInfo, null, 2)}</pre>
);

export default GameLobby;
