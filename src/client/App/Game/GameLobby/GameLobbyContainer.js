import { connect } from 'react-redux';
import { compose, withHandlers, lifecycle } from 'recompose';

import {
  client as clientSocketEvents,
  server as serverSocketEvents
} from '../../../../shared/socket-events';
import { setIsRunning } from '../../../actions/currentGameInfoActions';
import socket from '../../../socket';

import GameLobby from './GameLobby';

export default compose(
  connect(
    null,
    {
      setIsRunning
    }
  ),
  withHandlers({
    handleGameStart: () => () => {
      socket.emit(clientSocketEvents.GAME_START, res =>
        console.log(clientSocketEvents.GAME_START, res)
      );
    }
  }),
  lifecycle({
    componentDidMount() {
      const { setIsRunning } = this.props;
      socket.on(serverSocketEvents.GAME_STARTED, () => setIsRunning(true));
      socket.emit(clientSocketEvents.ROOMS_UPDATE_REQUEST);
    },
    componentWillUnmount() {
      socket.off(serverSocketEvents.GAME_STARTED);
    }
  })
)(GameLobby);
