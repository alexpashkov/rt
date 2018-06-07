import React from 'react';
import PropTypes from 'prop-types'; // prop-types are set in the container component
import styled from 'react-emotion';

/* eslint react/prop-types: 0 */
const MessageItem = ({ login, message }) => (
  <div>
    <div>{login}</div>
    <div>{message}</div>
  </div>
);

const Wrapper = styled.div`
  flex-grow: 1;
  overflow: auto;
  &:empty {
    display: flex;
    justify-content: center;
    align-items: center;
    &::after {
      content: 'Be the first in the chat!';
      color: ${props => props.theme.colors.secondaryText};
      display: block;
    } 
  }
`;

const MessageList = ({ messages }) => (
  <Wrapper>
    {!!messages.length &&
      messages.map(message => <MessageItem key={message.id} {...message} />)}
  </Wrapper>
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
