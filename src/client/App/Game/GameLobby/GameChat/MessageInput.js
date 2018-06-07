import React from 'react';
import PropTypes from 'prop-types';

const MessageInput = ({
  currentMessage,
  setCurrentMessage,
  handleMessageSending
}) => (
  <form onSubmit={handleMessageSending}>
    <input
      type="text"
      value={currentMessage}
      onChange={event => setCurrentMessage(event.currentTarget.value)}
    />
    <button>Send</button>
  </form>
);

MessageInput.propTypes = {
  currentMessage: PropTypes.string.isRequired,
  setCurrentMessage: PropTypes.func.isRequired,
  handleMessageSending: PropTypes.func.isRequired,
};

export default MessageInput;
