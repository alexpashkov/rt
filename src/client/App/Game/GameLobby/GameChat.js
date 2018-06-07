import React from 'react';
import PropTypes from 'prop-types';

const GameChat = ({
  messages = [],
  message,
  handleMessageChange,
  handleMessageSend
}) => (
  <div>
    <main>
      {messages.length
        ? messages.map((message, i) => <pre key={i}>{JSON.stringify(message)}</pre>)
        : 'Be the first who will send a message!'}
    </main>
    <form onSubmit={handleMessageSend}>
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
      />
      <button>Send</button>
    </form>
  </div>
);

GameChat.propTypes = {
  messages: PropTypes.array.isRequired,
  message: PropTypes.string.isRequired,
  handleMessageChange: PropTypes.func.isRequired,
  handleMessageSend: PropTypes.func.isRequired
};

export default GameChat;
