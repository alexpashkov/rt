import * as R from 'ramda';
import { compose, lifecycle, withHandlers } from 'recompose';
import socket from '../../socket';
import socketEvents from '../../../shared/socket-events';

/* A bit of fun with functional programming, don't do it when other people ought to read this code */

const keyCodeToDirection = new Map([[37, 'left'], [39, 'right'], [40, 'down']]);

const handlePieceMovement = R.pipe(
  R.prop('keyCode'),
  R.when(R.anyPass([R.equals(37), R.equals(39), R.equals(40)]), keyCode => {
    socket.emit(
      socketEvents.client.GAME_PIECE_MOVE,
      keyCodeToDirection.get(keyCode)
    );
  })
);

const handlePieceRotation = R.pipe(
  R.prop('keyCode'),
  R.when(R.equals(38), keyCode => {
    console.error(keyCode);
  })
);

export default compose(
  lifecycle({
    componentDidMount() {
      document.addEventListener('keyup', handlePieceMovement);
      document.addEventListener('keyup', handlePieceRotation);
    },
    componentWillUnmount() {
      document.removeEventListener('keyup', handlePieceMovement);
      document.removeEventListener('keyup', handlePieceRotation);
    }
  })
);
