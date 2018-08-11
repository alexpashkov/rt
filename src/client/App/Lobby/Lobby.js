import React from 'react';
import PropTypes from 'prop-types';

import LobbyHeader from './LobbyHeader';
import LobbyGamesList from './LobbyGamesList';

const Lobby = ({ gamesList, handleGameCreate, handleGameJoin }) => (
  <div
    css={`
      width: 100%;
      display: flex;
      flex-direction: column;
    `}
  >
    <LobbyHeader handleGameCreate={handleGameCreate} />
    {gamesList && gamesList.length ? (
      <LobbyGamesList gamesList={gamesList} handleGameJoin={handleGameJoin} />
    ) : (
      <div
        css={`
          display: flex;
          flex-grow: 1;
          align-items: center;
          justify-content: center;
        `}
      >
        <span>No games available</span>
      </div>
    )}
  </div>
);

Lobby.propTypes = {
  gamesList: PropTypes.array.isRequired,
  handleGameCreate: PropTypes.func.isRequired,
  handleGameJoin: PropTypes.func.isRequired
};

export default Lobby;
