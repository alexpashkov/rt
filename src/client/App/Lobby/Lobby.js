import React from 'react';
import PropTypes from 'prop-types';
import LobbyHeader from './LobbyHeader';
import LobbyGamesList from './LobbyGamesList';

const Lobby = ({ gameCreateRequest }) => (
  <React.Fragment>
    <LobbyHeader onGameStartRequest={gameCreateRequest} />
    <LobbyGamesList />
  </React.Fragment>
);

Lobby.propTypes = {
  gameCreateRequest: PropTypes.func.isRequired
};

export default Lobby;
