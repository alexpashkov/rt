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
import { setBoard, clearBoards } from '../../actions/boardsActions';
import { setCurrentPiece, setNextPiece } from '../../actions/pieceActions';
import { userBoardSelector, spectresSelector } from './selectors';
import withRunningGameLogic from './withRunningGameLogic';

import {
  client as clientSocketEvents,
  server as serverSocketEvents
} from '../../../shared/socket-events';

const emitGameJoin = (gameId, cb) =>
  socket.emit(clientSocketEvents.ROOM_JOIN, { id: gameId }, cb);
const emitGameLeave = gameId =>
  socket.emit(clientSocketEvents.ROOM_LEAVE, { id: gameId });

export default compose(
  connect(
    state => ({
      userId: state.user && state.user.id,
      userBoard: userBoardSelector(state),
      spectres: spectresSelector(state),
      currentGameInfo: state.currentGameInfo
    }),
    {
      setCurrentGameInfo,
      setBoard,
      clearBoards,
      setCurrentPiece,
      setNextPiece
    }
  ),
  withProps(({ match: { params: { gameId } } }) => ({
    gameId
  })),
  lifecycle({
    componentDidMount() {
      const {
        gameId,
        setCurrentGameInfo,
        setCurrentPiece,
        setNextPiece,
        setBoard,
        clearBoards
      } = this.props;
      emitGameJoin(gameId, ({ status, roomInfo, description }) => {
        if (status === 'error') {
          /* failed to join the game, redirect to lobby */
          // alert(description || 'Failed to join the game');
          return history.push('/');
        }
        setCurrentGameInfo(roomInfo);
      });
      /* subscribe to game info updates, e.g when new player joins the game
      is reflected for players who's in the game lobby */
      socket.on(serverSocketEvents.ROOM_INFO_UPDATE, setCurrentGameInfo);
      socket.on(serverSocketEvents.GAME_PIECE_CURRENT, ({ piece }) =>
        setCurrentPiece(piece)
      );
      socket.on(serverSocketEvents.GAME_PIECE_NEXT, data => {
        console.error(data);
        setNextPiece(data.piece);
      });
      socket.on(serverSocketEvents.GAME_BOARD_CURRENT, data =>
        setBoard(data.id, data.board)
      );
      socket.on(serverSocketEvents.GAME_FINISHED, ({winnerId = ""} = {}) => {
        alert("Game finished!" + winnerId ? "\nWinner is " + winnerId : "");
        clearBoards();
      });
    },
    componentWillUnmount() {
      const { gameId, setCurrentGameInfo } = this.props;
      /* emit leave event for the server */
      emitGameLeave(gameId);
      /* set current game info to null, so we can use it as indicator for a spinner */
      setCurrentGameInfo(null);
      socket.off(serverSocketEvents.ROOM_INFO_UPDATE);
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
  ),
  withRunningGameLogic
)(Game);
