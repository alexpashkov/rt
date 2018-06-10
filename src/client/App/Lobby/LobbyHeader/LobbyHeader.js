import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import Logo from '../../../components/Logo';
import Button from '../../../components/Button';
import { panelCss } from '../../../components/Panel';

const StyledContainer = styled.header`
  ${panelCss};
  display: flex;
  align-items: center;
  border-top: none;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

const LobbyHeader = ({ handleGameCreate }) => (
  <StyledContainer>
    <Logo />
    <Button
      color="primary"
      size="lg"
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
