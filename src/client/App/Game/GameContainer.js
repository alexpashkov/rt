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
// import withRunningGameLogic from './withRunningGameLogic';
import Game from './Game';
import { setBoard } from '../../actions/boardsActions';
import { setPiece } from '../../actions/currentPieceActions';
import { userBoardSelector } from './selectors';

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
      userBoard: userBoardSelector(state),
      currentGameInfo: state.currentGameInfo
    }),
    {
      setCurrentGameInfo,
      setBoard,
      setPiece
    }
  ),
  withProps(({ match: { params: { gameId } } }) => ({
    gameId
  })),
  lifecycle({
    componentDidMount() {
      const { gameId, setCurrentGameInfo, setPiece, setBoard } = this.props;
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
      socket.on(serverSocketEvents.GAME_PIECE_CURRENT, data => {
        console.log(serverSocketEvents.GAME_PIECE_CURRENT, data);
        setPiece(data.piece);
      });
      socket.on(serverSocketEvents.GAME_BOARD_CURRENT, data => {
        setBoard(data.id, data.board);
      });
    },
    componentWillUnmount() {
      const { gameId, setCurrentGameInfo } = this.props;
      /* emit leave event for the server */
      emitGameLeave(gameId);
      /* set current game info to null, so we can use it as indicator for a spinner */
      setCurrentGameInfo(null);
      socket.off(serverSocketEvents.GAME_INFO_UPDATE);
      socket.off(serverSocketEvents.GAME_PIECE_CURRENT);
      socket.off(serverSocketEvents.GAME_BOARD_CURRENT);
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
  // withRunningGameLogic
)(Game);
