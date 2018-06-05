import {
  compose,
  branch,
  lifecycle,
  renderComponent,
  withProps
} from 'recompose';
import { connect } from 'react-redux';

import { setInfo as setCurrentGameInfo } from '../../actions/currentGameInfoActions';
import history from '../../history';
import socket from '../../socket';
import CenteredSpinner from './CenteredSpinner';
import GameLobby from './GameLobby';
import Game  from './Game';

import { client as clientSocketEvents } from '../../../shared/socket-events';

const emitGameJoin = (gameId, cb) =>
  socket.emit(clientSocketEvents.GAME_JOIN, { id: gameId }, cb);
const emitGameLeave = gameId =>
  socket.emit(clientSocketEvents.GAME_LEAVE, { id: gameId });

export default compose(
  connect(
    state => ({
      currentGameInfo: state.currentGameInfo
    }),
    {
      setCurrentGameInfo
    }
  ),
  withProps(({ match: { params: { gameId } } }) => ({
    gameId
  })),
  lifecycle({
    componentDidMount() {
      const { gameId, setCurrentGameInfo } = this.props;
      const handleGameJoinResponse = ({ status, gameInfo, description }) => {
        if (status === 'error') {
          /* failed to join the game, redirect to lobby */
          alert(description || 'Failed to join the game');
          return history.push('/');
        }
        setTimeout(() => setCurrentGameInfo(gameInfo), 1500); // artificial delay to test spinner
      };
      emitGameJoin(gameId, handleGameJoinResponse);
    },
    componentWillUnmount() {
      const { gameId, setCurrentGameInfo } = this.props;
      /* emit leave event for the server */
      emitGameLeave(gameId);
      /* set current game info to null, so we can use it as indicator for a spinner */
      setCurrentGameInfo(null);
    }
  }),
  branch(
    ({ currentGameInfo }) => !currentGameInfo,
    renderComponent(CenteredSpinner)
  ),
  branch(
    ({ currentGameInfo }) => !currentGameInfo.isRunning,
    renderComponent(GameLobby)
  )
)(Game);
