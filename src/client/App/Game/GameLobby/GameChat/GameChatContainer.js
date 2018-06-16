import { compose, lifecycle, withStateHandlers, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import {
  client as clientSocketEvents,
  server as serverSocketEvents
} from '../../../../../shared/socket-events';
import GameChat from './GameChat';
import socket from '../../../../socket';
import { addChatMessage } from '../../../../actions/currentGameInfoActions';

export default compose(
  connect(
    state => ({
      messages: state.currentGameInfo.chatHistory
    }),
    {
      addChatMessage
    }
  ),
  withStateHandlers(
    {
      currentMessage: ''
    },
    {
      setCurrentMessage: () => value => ({ currentMessage: value })
    }
  ),
  withHandlers({
    handleMessageSending: ({ currentMessage, setCurrentMessage }) => event => {
      event.preventDefault();
      socket.emit(clientSocketEvents.GAME_CHAT_MESSAGE, currentMessage);
      setCurrentMessage(''); /* clear message input */
    }
  }),
  lifecycle({
    componentDidMount() {
      const { addChatMessage } = this.props;
      socket.on(serverSocketEvents.GAME_CHAT_MESSAGE, addChatMessage);
    }
  })
)(GameChat);