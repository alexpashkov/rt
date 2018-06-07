import {
  compose,
  branch,
  lifecycle,
  renderComponent,
  withProps,
  setPropTypes
} from 'recompose';
import { connect } from 'react-redux';

import gamePropTypes from './gamePropTypes';
import { setInfo as setCurrentGameInfo } from '../../actions/currentGameInfoActions';
import history from '../../history';
import socket from '../../socket';
import CenteredSpinner from './CenteredSpinner';
import GameLobby from './GameLobby';
import Game from './Game';

import {
  client as clientSocketEvents,
  server as serverSocketEvents
} from '../../../shared/socket-events';

const emitGameJoin = (gameId, cb) =>
  socket.emit(clientSocketEvents.GAME_JOIN, { id: gameId }, cb);
const emitGameLeave = gameId =>
  socket.emit(clientSocketEvents.GAME_LEAVE, { id: gameId });

export default compose(
  connect(
    state => ({
      userId: state.user && state.user.id,
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
      emitGameJoin(gameId, ({ status, gameInfo, description }) => {
        if (status === 'error') {
          /* failed to join the game, redirect to lobby */
          alert(description || 'Failed to join the game');
          return history.push('/');
        }
        setCurrentGameInfo(gameInfo);
      });
      /* subscribe to game info updates, e.g when new player joins the game
      is reflected for players who's in the game lobby */
      socket.on(serverSocketEvents.GAME_INFO_UPDATE, setCurrentGameInfo);
    },
    componentWillUnmount() {
      const { gameId, setCurrentGameInfo } = this.props;
      /* emit leave event for the server */
      emitGameLeave(gameId);
      /* set current game info to null, so we can use it as indicator for a spinner */
      setCurrentGameInfo(null);
      socket.off(serverSocketEvents.GAME_INFO_UPDATE);
    }
  }),
  setPropTypes(gamePropTypes),
  branch(
    ({ currentGameInfo }) => !currentGameInfo,
    renderComponent(CenteredSpinner)
  ),
  branch(
    ({ currentGameInfo }) => !currentGameInfo.isRunning,
    renderComponent(GameLobby)
  )
)(Game);
