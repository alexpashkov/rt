import React from 'react';
import PropTypes from 'prop-types';

const LobbyGamesList = ({ gamesList }) => (
  <div>
    {gamesList.map(game => <pre key={game.id}>{JSON.stringify(game)}</pre>)}
  </div>
);

LobbyGamesList.propTypes = {
  gamesList: PropTypes.array.isRequired
};

export default LobbyGamesList;
