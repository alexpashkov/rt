import React from 'react';
import PropTypes from 'prop-types'; // prop-actionTypes are set in the container component

import {
  MessagesWrapper,
  MessageItemWrapper,
  UserIdWrapper,
  MessageWrapper
} from './styled';

/* eslint react/prop-actionTypes: 0 */
const MessageItem = ({ login, message }) => (
  <MessageItemWrapper>
    <UserIdWrapper title={login}>{login}</UserIdWrapper>
    <MessageWrapper>{message}</MessageWrapper>
  </MessageItemWrapper>
);

class MessageList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
  }

  componentDidMount() {
    this.scrollMessagesWrapperToTheBottom();
  }

  componentDidUpdate({ messages: prevMessages }) {
    const { messages } = this.props;
    if (messages.length !== prevMessages.length) {
      /* scroll to the bottom */
      this.scrollMessagesWrapperToTheBottom();
    }
  }

  scrollMessagesWrapperToTheBottom() {
    this.wrapperRef.current.scrollTop = this.wrapperRef.current.scrollHeight;
  }

  render() {
    const { messages = [] } = this.props;
    return (
      <MessagesWrapper innerRef={this.wrapperRef}>
        {!!messages.length &&
          messages.map((message, i) => <MessageItem key={i} {...message} />)}
      </MessagesWrapper>
    );
  }
}

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
