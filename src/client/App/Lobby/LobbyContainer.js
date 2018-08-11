import { compose, lifecycle, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import history from '../../history';

import {
  client as clientSocketEvents,
  server as serverSocketEvents
} from '../../../shared/socket-events';
import socket from '../../socket';
import { setList } from '../../actions/gamesListActions';
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
      socket.on(serverSocketEvents.ROOMS_UPDATE, setList);
      socket.emit(clientSocketEvents.ROOMS_UPDATE_REQUEST);
    },
    componentWillUnmount() {
      socket.off(serverSocketEvents.ROOMS_UPDATE);
    }
  }),
  withHandlers({
    handleGameCreate: () => emitGameCreate,
    handleGameJoin: () => navigateToGamePage
  })
)(Lobby);

const navigateToGamePage = gameId => history.push(`/${gameId}`);

const emitGameCreate = () =>
  socket.emit(clientSocketEvents.ROOM_CREATE, handleGameCreateResponse);

const handleGameCreateResponse = ({ status, roomId }) => {
  if (status !== 'success') return alert('Failed to join the game');
  navigateToGamePage(roomId);
};
