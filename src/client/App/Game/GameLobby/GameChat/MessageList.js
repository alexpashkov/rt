import React from 'react';
import PropTypes from 'prop-types'; // prop-types are set in the container component

import {
  MessagesWrapper,
  MessageItemWrapper,
  UserIdWrapper,
  MessageWrapper
} from './styled';

/* eslint react/prop-types: 0 */
const MessageItem = ({ login, message }) => (
  <MessageItemWrapper>
    <UserIdWrapper title={login}>{login}</UserIdWrapper>
    <MessageWrapper>{message}</MessageWrapper>
  </MessageItemWrapper>
);

const MessageList = ({ messages }) => (
  <MessagesWrapper>
    {!!messages.length &&
      messages.map((message, i) => <MessageItem key={i} {...message} />)}
  </MessagesWrapper>
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
