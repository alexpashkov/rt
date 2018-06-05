import { compose, lifecycle, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import history from "../../history";

import {
  client as clientSocketEvents,
  server as serverSocketEvents
} from '../../../shared/socket-events';
import socket from '../../socket';
import { setList } from '../../actions/gamesList';
import Lobby from './Lobby';

export default compose(
  connect(
    state => ({
      gamesList: state.gamesList
    }),
    {
      setList
    }
  ),
  lifecycle({
    componentDidMount() {
      const { setList } = this.props;
      socket.on(serverSocketEvents.GAMES_UPDATE, setList);
    },
    componentWillUnmount() {
      socket.off(serverSocketEvents.GAMES_UPDATE);
    }
  }),
  withHandlers({
    handleGameCreate: () => emitGameCreate,
    handleGameJoin: () => navigateToGamePage
  })
)(Lobby);

const navigateToGamePage = gameId => history.push(`/${gameId}`);

const emitGameCreate = () =>
  socket.emit(clientSocketEvents.GAME_CREATE, handleGameCreateResponse);

const handleGameCreateResponse = ({ status, gameId }) => {
  if (status !== 'success') {
    return alert('Failed to join the game');
  }
  navigateToGamePage(gameId);
};

