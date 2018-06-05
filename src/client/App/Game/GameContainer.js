import { compose, lifecycle, mapProps } from 'recompose';

import socket from '../../socket';
import Game from './Game';
import { client as clientSocketEvents } from '../../../shared/socket-events';

// const handleGameJoinResponse = ({ status, gameInfo, description }) => {};

const emitGameJoin = gameId =>
  socket.emit(
    clientSocketEvents.GAME_JOIN,
    { id: gameId },
    console.log
    // handleGameJoinResponse
  );
const emitGameLeave = gameId =>
  socket.emit(clientSocketEvents.GAME_LEAVE, { id: gameId }, console.log);

export default compose(
  mapProps(({ match: { params: { gameId } } }) => ({
    gameId
  })),
  lifecycle({
    componentDidMount() {
      const { gameId } = this.props;
      emitGameJoin(gameId);
    },
    componentWillUnmount() {
      const { gameId } = this.props;
      emitGameLeave(gameId);
    }
  })
)(Game);
