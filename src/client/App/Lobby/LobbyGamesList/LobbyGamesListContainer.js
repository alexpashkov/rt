import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

import LobbyGamesList from './LobbyGamesList';

export default compose(
  connect(state => ({
    gamesList: state.gamesList
  })),
  withHandlers({
    onGameJoin: () => console.log
  })
)(LobbyGamesList);
