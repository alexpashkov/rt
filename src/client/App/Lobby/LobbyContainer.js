import { compose, lifecycle, withHandlers } from 'recompose';

import socketEvents from '../../../shared/socket-events';
import socket from '../../socket';
import Lobby from './Lobby';

export default compose(
  lifecycle({
    componentDidMount() {
      socket.on(socketEvents.server.GAMES_UPDATE, console.log);
    },
    componentWillUnmount() {
      socket.off(socketEvents.server.GAMES_UPDATE);
    }
  }),
  withHandlers({
    gameCreateRequest: () => () =>
      socket.emit(socketEvents.client.GAME_CREATE, console.log)
  })
)(Lobby);
