import { compose, withStateHandlers } from 'recompose';
import GameChat from './GameChat';

export default compose(
  withStateHandlers(
    {
      message: ''
    },
    {
      handleMessageChange: () => value => ({ message: value })
    }
  )
)(GameChat);
