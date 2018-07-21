import * as R from 'ramda';
import { compose, lifecycle, withHandlers } from 'recompose';
import socket from '../../socket';
import socketEvents from '../../../shared/socket-events';
import throttle from 'lodash.throttle';

const keyCodeToDirectionStringMap = {
  37: 'left',
  39: 'right',
  40: 'down'
};

/* A bit of fun with functional programming, don't do it when other people ought to read this code */
const handlePieceMovement = throttle(
  R.pipe(
    R.prop('keyCode'),
    R.when(R.anyPass([R.equals(37), R.equals(39), R.equals(40)]), keyCode =>
      socket.emit(
        socketEvents.client.GAME_PIECE_MOVE,
        keyCodeToDirectionStringMap[keyCode]
      )
    )
  ),
  75
);

const handlePieceRotation = throttle(
  R.pipe(
    R.prop('keyCode'),
    R.when(R.equals(38), () =>
      socket.emit(socketEvents.client.GAME_PIECE_ROTATE, 'right')
    )
  ),
  75
);

export default compose(
  lifecycle({
    componentDidMount() {
      document.addEventListener('keydown', handlePieceMovement);
      document.addEventListener('keydown', handlePieceRotation);
    },
    componentWillUnmount() {
      document.removeEventListener('keydown', handlePieceMovement);
      document.removeEventListener('keydown', handlePieceRotation);
    }
  })
);
