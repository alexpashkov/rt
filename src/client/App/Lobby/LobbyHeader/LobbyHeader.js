import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import Logo from '../../../components/Logo';
import Button from '../../../components/Button';

const StyledContainer = styled.header`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

const LobbyHeader = ({ handleGameCreate }) => (
  <StyledContainer>
    <Logo />
    <Button
      color="primary"
      css={`
        margin-left: auto;
      `}
      onClick={handleGameCreate}
    >
      Start Game
    </Button>
  </StyledContainer>
);

LobbyHeader.propTypes = {
  handleGameCreate: PropTypes.func.isRequired
};

export default LobbyHeader;
