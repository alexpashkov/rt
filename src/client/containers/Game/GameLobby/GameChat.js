import React, { Component } from "react";
import { compose } from "ramda";
import withSocket from "../../../hocs/with-socket";
import { connect } from "react-redux";
import { appendChatMessage } from "../../../actions/game-chat-messages";
import {
  client as clientSocketEvents,
  server as serverSocketEvents
} from "../../../../shared/types";

class GameChat extends Component {
  state = {
    message: ""
  };
  render() {
    const { messages } = this.props;
    return (
      <div className="chat">
        <div className="chat__messages">
          {messages.map(({ id, login, message }) => (
            <article key={id} className="chat__message">
              <span className="chat__message-login">{login}</span>
              <span className="chat__message-message">{message}</span>
            </article>
          ))}
        </div>
        <form onSubmit={this.handleMessageSend}>
          <input
            type="text"
            className="chat__input"
            onChange={this.handleMessageChange}
            value={this.state.message}
          />
        </form>
      </div>
    );
  }
  handleMessageChange = ({ target: { value } }) => {
    this.setState({
      message: value
    });
  };
  handleMessageSend = e => {
    console.log(this.state.message);
    e.preventDefault();
    const { socket } = this.props;
    socket.emit(clientSocketEvents.GAME_CHAT_MESSAGE, this.state.message);
  };
  componentDidMount() {
    const { socket, appendChatMessage } = this.props;
    socket.on(serverSocketEvents.GAME_CHAT_MESSAGE, appendChatMessage);
  }
  componentWillUnmount() {
    const { socket, appendChatMessage } = this.props;
    socket.removeListener(
      serverSocketEvents.GAME_CHAT_MESSAGE,
      appendChatMessage
    );
  }
}

export default compose(
  withSocket,
  connect(
    state => ({
      messages: state.game.messages
    }),
    {
      appendChatMessage
    }
  )
)(GameChat);
