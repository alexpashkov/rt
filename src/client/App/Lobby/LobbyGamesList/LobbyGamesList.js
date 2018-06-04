import React from 'react';
import PropTypes from 'prop-types';
import GamesListItem from './GamesListItem';

const LobbyGamesList = ({ gamesList, onGameJoin }) => (
  <div>
    {gamesList.map(game => (
      <GamesListItem key={game.id} {...game} onGameJoin={onGameJoin} />
    ))}
  </div>
);

LobbyGamesList.propTypes = {
  gamesList: PropTypes.array.isRequired,
  onGameJoin: PropTypes.func.isRequired
};

export default LobbyGamesList;
