import React from 'react';
import PropTypes from 'prop-types';

import MessageList from './MessageList';
import MessageInput from './MessageInput';

const GameChat = ({
  messages = [],
  currentMessage,
  setCurrentMessage,
  handleMessageSending,
  className
}) => (
  <div className={className}>
    <MessageList messages={messages} />
    <MessageInput
      currentMessage={currentMessage}
      setCurrentMessage={setCurrentMessage}
      handleMessageSending={handleMessageSending}
    />
  </div>
);

GameChat.propTypes = {
  messages: PropTypes.array.isRequired,
  currentMessage: PropTypes.string.isRequired,
  setCurrentMessage: PropTypes.func.isRequired,
  handleMessageSending: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default GameChat;
