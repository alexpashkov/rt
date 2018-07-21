import * as R from 'ramda';
import { compose, lifecycle, withHandlers } from 'recompose';
import socket from '../../socket';
import socketEvents from '../../../shared/socket-events';
import throttle from 'lodash.throttle';

const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;
const SPACE = 32;

const keyCodeToDirectionStringMap = {
  [LEFT]: 'left',
  [RIGHT]: 'right',
  [DOWN]: 'down'
};

/* A bit of fun with functional programming, don't do it when other people ought to read this code */
const with100msThrottle = fn => throttle(fn, 100);
const whenKeyCodeSatisfies = (predicate, fn) =>
  R.pipe(
    R.prop('keyCode'),
    R.when(predicate, fn)
  );

const handlePieceMovement = with100msThrottle(
  R.pipe(
    R.prop('keyCode'),
    R.when(
      R.anyPass([R.equals(LEFT), R.equals(RIGHT), R.equals(DOWN)]),
      keyCode =>
        socket.emit(
          socketEvents.client.GAME_PIECE_MOVE,
          keyCodeToDirectionStringMap[keyCode]
        )
    )
  )
);

const handlePieceRotation = with100msThrottle(
  R.pipe(
    R.prop('keyCode'),
    R.when(R.equals(UP), () =>
      socket.emit(socketEvents.client.GAME_PIECE_ROTATE, 'right')
    )
  )
);

const handlePieceDrop = with100msThrottle(
  R.pipe(
    R.prop('keyCode'),
    R.when(R.equals(SPACE), () =>
      socket.emit(socketEvents.client.GAME_PIECE_DROP)
    )
  )
);

export default compose(
  lifecycle({
    componentDidMount() {
      document.addEventListener('keydown', handlePieceMovement);
      document.addEventListener('keydown', handlePieceRotation);
      document.addEventListener('keydown', handlePieceDrop);
    },
    componentWillUnmount() {
      document.removeEventListener('keydown', handlePieceMovement);
      document.removeEventListener('keydown', handlePieceRotation);
      document.removeEventListener('keydown', handlePieceDrop);
    }
  })
);
