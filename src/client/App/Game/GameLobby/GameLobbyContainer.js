import { compose, withHandlers } from 'recompose';

import GameLobby from './GameLobby';

export default compose(
  withHandlers({
    handleGameStart: () => () => console.log('Handle game start')
  })
)(GameLobby);
