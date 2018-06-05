import React from 'react';
import PropTypes from 'prop-types';

import LobbyHeader from './LobbyHeader';
import LobbyGamesList from './LobbyGamesList';

const Lobby = ({ gamesList, handleGameCreate, handleGameJoin }) => (
  <div css={`
    width: 100%
  `}>
    <LobbyHeader handleGameCreate={handleGameCreate} />
    <LobbyGamesList gamesList={gamesList} handleGameJoin={handleGameJoin} />
  </div>
);

Lobby.propTypes = {
  gamesList: PropTypes.array.isRequired,
  handleGameCreate: PropTypes.func.isRequired,
  handleGameJoin: PropTypes.func.isRequired
};

export default Lobby;
