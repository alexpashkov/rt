import React, { Component } from "react";
import { compose } from "ramda";
import withSocket from "../../../hocs/with-socket";
import { connect } from "react-redux";
import { appendChatMessage } from "../../../actions/game-chat-messages";
import {
  client as clientSocketEvents,
  server as serverSocketEvents
} from "../../../../shared/types";
import "./GameChat.scss";

class GameChat extends Component {
  state = {
    message: ""
  };

  componentDidUpdate({messages: prevMessages = []}) {
    const { messages = [] } = this.props;
    if (prevMessages.length !== messages.length) {
      this.messagesElem.scrollTop = this.messagesElem.scrollHeight;
    }
  }

  render() {
    const { messages } = this.props;
    return (
      <section className="GameChat">
        <h2>Game Chat</h2>
        <div ref={el => (this.messagesElem = el)} className="GameChat__messages">
          {messages.map(({ id, login, message }) => (
            <article key={id} className="GameChat__message">
              <div className="GameChat__message-sender">{login}</div>
              <div className="GameChat__message-content">{message}</div>
            </article>
          ))}
        </div>
        <form className="GameChat__message-input-form" onSubmit={this.handleMessageSend}>
          <input
            type="text"
            className="GameChat__message-input"
            onChange={this.handleMessageChange}
            value={this.state.message}
          />
          <button className="GameChat__message-send-button primary">Send</button>
        </form>
      </section>
    );
  }
  handleMessageChange = ({ target: { value } }) => {
    this.setState({
      message: value
    });
  };
  handleMessageSend = e => {
    e.preventDefault();
    const { socket } = this.props;
    socket.emit(clientSocketEvents.GAME_CHAT_MESSAGE, this.state.message);
    this.setState({message: ""})
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
