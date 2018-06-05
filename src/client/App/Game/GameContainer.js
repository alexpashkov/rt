import { compose, lifecycle, mapProps } from 'recompose';

import history from "../../history";
import socket from '../../socket';
import Game from './Game';
import { client as clientSocketEvents } from '../../../shared/socket-events';

const handleGameJoinResponse = ({ status, gameInfo, description }) => {
  if (status === "error") {
    // failed to join the game, redirect to lobby
    console.warn(`Failed to join the game: ${description}`);
    return history.push("/")
  }

};

const emitGameJoin = (gameId, cb) =>
  socket.emit(
    clientSocketEvents.GAME_JOIN,
    { id: gameId },
    cb
  );
const emitGameLeave = gameId =>
  socket.emit(clientSocketEvents.GAME_LEAVE, { id: gameId });

export default compose(
  mapProps(({ match: { params: { gameId } } }) => ({
    gameId
  })),
  lifecycle({
    componentDidMount() {
      const { gameId } = this.props;
      emitGameJoin(gameId, handleGameJoinResponse);
    },
    componentWillUnmount() {
      const { gameId } = this.props;
      emitGameLeave(gameId);
    }
  })
)(Game);
