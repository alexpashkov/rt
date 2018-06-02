import React from 'react';
import PropTypes from 'prop-types';
import GamesListItem from './GamesListItem';

const LobbyGamesList = ({ gamesList }) => (
  <div>{gamesList.map(game => <GamesListItem key={game.id} {...game} />)}</div>
);

LobbyGamesList.propTypes = {
  gamesList: PropTypes.array.isRequired
};

export default LobbyGamesList;
