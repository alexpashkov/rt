import React from "react";
import styled from "react-emotion";

const LogoText = styled.h1`
  font-size: 3rem;
  margin: 0;
`;

export default () => (
  <LogoText>
    <span
      css={`
        color: red;
      `}
    >
      Red
    </span>
    <span
      css={`
        color: white;
      `}
    >
      Tetris
    </span>
  </LogoText>
);
