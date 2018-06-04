import { compose, lifecycle, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import {
  client as clientSocketEvents,
  server as serverSocketEvents
} from '../../../shared/socket-events';
import socket from '../../socket';
import { setList } from '../../actions/gamesList';
import Lobby from './Lobby';

const handleGameJoinResponse = ({ status, gameInfo, description }) => {
  console.log(status, gameInfo, description);
};

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
    handleGameCreate: () => () =>
      socket.emit(
        clientSocketEvents.GAME_CREATE,
        ({ status, gameId, ...rest }) => {
          console.log('game create', status, gameId, rest);
          if (status !== 'success') {
            return alert('Failed to join the game');
          }
          socket.emit(
            clientSocketEvents.GAME_JOIN,
            { id: gameId },
            handleGameJoinResponse
          );
        }
      ),
    handleGameJoin: () => gameId => {
      socket.emit(
        clientSocketEvents.GAME_JOIN,
        { id: gameId },
        handleGameJoinResponse
      );
    }
  })
)(Lobby);
