import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import MessageList from './MessageList';
import MessageInput from './MessageInput';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const GameChat = ({
  messages = [],
  currentMessage,
  setCurrentMessage,
  handleMessageSending,
  className
}) => (
  <StyledWrapper className={className}>
    <h2>Game Chart</h2>
    <MessageList messages={messages} />
    <MessageInput
      currentMessage={currentMessage}
      setCurrentMessage={setCurrentMessage}
      handleMessageSending={handleMessageSending}
    />
  </StyledWrapper>
);

GameChat.propTypes = {
  messages: PropTypes.array.isRequired,
  currentMessage: PropTypes.string.isRequired,
  setCurrentMessage: PropTypes.func.isRequired,
  handleMessageSending: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default GameChat;
