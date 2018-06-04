import { compose, lifecycle, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import socketEvents from '../../../shared/socket-events';
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
      socket.on(socketEvents.server.GAMES_UPDATE, setList);
    },
    componentWillUnmount() {
      socket.off(socketEvents.server.GAMES_UPDATE);
    }
  }),
  withHandlers({
    handleGameCreate: () => () =>
      socket.emit(socketEvents.client.GAME_CREATE, ({ status, gameId }) => {
        console.log(status, gameId);
      }),
    handleGameJoin: () => gameId => console.log(id)
  })
)(Lobby);
