import React from 'react';
import PropTypes from 'prop-types';
import GamesListItem from './GamesListItem';

const LobbyGamesList = ({ gamesList, handleGameJoin }) => (
  <div css={`display: table; width: 100%`}>
    {gamesList.map(game => (
      <GamesListItem key={game.id} {...game} handleGameJoin={handleGameJoin} />
    ))}
  </div>
);

LobbyGamesList.propTypes = {
  gamesList: PropTypes.array.isRequired,
  handleGameJoin: PropTypes.func.isRequired
};

export default LobbyGamesList;
