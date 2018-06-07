import React from 'react';
import PropTypes from 'prop-types';

const GameChat = ({
  messages = [],
  currentMessage,
  setCurrentMessage,
  handleMessageSending
}) => (
  <div css={`
    flex-basis: 30vh;
  `}>
   <main>
      {messages.length
        ? messages.map((message, i) => <pre key={i}>{JSON.stringify(message)}</pre>)
        : 'Be the first who will send a message!'}
    </main>
    <form onSubmit={handleMessageSending}>
      <input
        type="text"
        value={currentMessage}
        onChange={event => setCurrentMessage(event.currentTarget.value)}
      />
      <button>Send</button>
    </form>
  </div>
);

GameChat.propTypes = {
  messages: PropTypes.array.isRequired,
  currentMessage: PropTypes.string.isRequired,
  setCurrentMessage: PropTypes.func.isRequired,
  handleMessageSending: PropTypes.func.isRequired
};

export default GameChat;
