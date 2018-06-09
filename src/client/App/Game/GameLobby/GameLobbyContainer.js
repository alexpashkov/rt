import { compose, withHandlers } from 'recompose';

import { client as clientSocketEvents } from '../../../../shared/socket-events';
import socket from '../../../socket';

import GameLobby from './GameLobby';

export default compose(
  withHandlers({
    handleGameStart: () => () =>
      socket.emit(clientSocketEvents.GAME_START, console.log)
  })
)(GameLobby);
