import { compose, lifecycle, withHandlers } from 'recompose';
import { connect } from 'react-redux';

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
    handleGameCreate: () => () =>
      socket.emit(clientSocketEvents.GAME_CREATE, ({ status, gameId }) => {
        console.log(status, gameId);
      }),
    handleGameJoin: () => gameId => {
      socket.emit(clientSocketEvents.GAME_JOIN, gameId, console.log);
    }
  })
)(Lobby);
