import { compose, lifecycle } from 'recompose';
import socket from '../../socket';
import socketEvents from '../../../shared/socket-events';

export default compose(
  lifecycle({
    componentDidMount() {
      socket.on(socketEvents.server.GAME_PIECE_CURRENT, console.log);
      socket.on(socketEvents.server.GAME_BOARD_CURRENT, console.log);
    },
    componentWillUnmount() {
      socket.off(socketEvents.server.GAME_PIECE_CURRENT);
      socket.off(socketEvents.server.GAME_BOARD_CURRENT);
    }
  })
);
