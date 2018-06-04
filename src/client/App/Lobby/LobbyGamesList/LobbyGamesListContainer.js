import { connect } from 'react-redux';
import { compose } from 'recompose';

import LobbyGamesList from './LobbyGamesList';

export default compose(
  connect(state => ({
    gamesList: state.gamesList
  }))
)(LobbyGamesList);
