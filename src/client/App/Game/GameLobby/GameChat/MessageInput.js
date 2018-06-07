import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { lighten } from 'polished';

import Button from '../../../../components/Button';

const StyledForm = styled.form`
  display: flex;
  background-color: ${({ theme }) => lighten(0.1, theme.colors.background)};
  flex-shrink: 0;
  align-items: center;
  padding: 5px;
  border-radius: ${props => props.theme.defaultBorderRadius};
`;
const StyledInput = styled.input`
  flex-grow: 1;
  align-self: stretch;
  margin-right: 5px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.secondaryText};
  &:focus {
    outline: none;
  }
`;

const MessageInput = ({
  currentMessage,
  setCurrentMessage,
  handleMessageSending
}) => (
  <StyledForm onSubmit={handleMessageSending}>
    <StyledInput
      type="text"
      value={currentMessage}
      onChange={event => setCurrentMessage(event.currentTarget.value)}
    />
    <Button color="primary" size="sm">
      Send
    </Button>
  </StyledForm>
);

MessageInput.propTypes = {
  currentMessage: PropTypes.string.isRequired,
  setCurrentMessage: PropTypes.func.isRequired,
  handleMessageSending: PropTypes.func.isRequired
};

export default MessageInput;
