import React from 'react';
import PropTypes from 'prop-types';
import LobbyHeader from './LobbyHeader';
import LobbyGamesList from './LobbyGamesList';

const Lobby = ({ gamesList, handleGameCreate, handleGameJoin }) => (
  <React.Fragment>
    <LobbyHeader handleGameCreate={handleGameCreate} />
    <LobbyGamesList gamesList={gamesList} handleGameJoin={handleGameJoin} />
  </React.Fragment>
);

Lobby.propTypes = {
  handleGameCreate: PropTypes.func.isRequired,
  handleGameJoin: PropTypes.func.isRequired
};

export default Lobby;
