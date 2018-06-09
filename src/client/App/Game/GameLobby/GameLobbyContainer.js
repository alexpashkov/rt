import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

import { client as clientSocketEvents } from '../../../../shared/socket-events';
import { setIsRunning } from '../../../actions/currentGameInfoActions';
import socket from '../../../socket';

import GameLobby from './GameLobby';

export default compose(
  connect(null, {
    setIsRunning
  }),
  withHandlers({
    handleGameStart: ({ setIsRunning }) => () => {
      socket.emit(clientSocketEvents.GAME_START, res => {
        if (res.status === 'success') {
          setIsRunning(true);
          return;
        }
        console.warn(res);
      });
    }
  })
)(GameLobby);
