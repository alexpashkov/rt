import LobbyGamesList from './LobbyGamesList';
import { connect } from 'react-redux';

export default connect(state => ({
  gamesList: state.gamesList
}))(LobbyGamesList);
