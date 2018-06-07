import React from 'react';
import PropTypes from 'prop-types';

const MessageList = ({ messages }) => (
  <div>
    {messages.length
      ? messages.map((message, i) => (
          <pre key={i}>{JSON.stringify(message)}</pre>
        ))
      : 'Be the first who will send a message!'}
  </div>
);

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      login: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired
    })
  )
};

export default MessageList;
