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
  connect(null, {
    setIsRunning
  }),
  withHandlers({
    handleGameStart: () => () => {
      socket.emit(clientSocketEvents.GAME_START, res =>
        console.log('GAME_START event response: ', res)
      );
    }
  }),
  lifecycle({
    componentDidMount() {
      const { setIsRunning } = this.props;
      socket.on(serverSocketEvents.GAME_STARTED, () => setIsRunning(true));
    },
    componentWillUnmount() {
      const { setIsRunning } = this.props;
      socket.off(serverSocketEvents.GAME_STARTED);
    }
  })
)(GameLobby);
