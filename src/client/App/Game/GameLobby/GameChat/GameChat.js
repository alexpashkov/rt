import React from 'react';
import PropTypes from 'prop-types';

import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { GameChatWrapper } from './styled';

const GameChat = ({
  messages = [],
  currentMessage,
  setCurrentMessage,
  handleMessageSending,
  className
}) => (
  <GameChatWrapper className={className}>
    <MessageList messages={messages} />
    <MessageInput
      currentMessage={currentMessage}
      setCurrentMessage={setCurrentMessage}
      handleMessageSending={handleMessageSending}
    />
  </GameChatWrapper>
);

GameChat.propTypes = {
  messages: PropTypes.array.isRequired,
  currentMessage: PropTypes.string.isRequired,
  setCurrentMessage: PropTypes.func.isRequired,
  handleMessageSending: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default GameChat;
