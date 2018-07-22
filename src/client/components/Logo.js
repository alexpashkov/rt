import React from "react";
import styled from "react-emotion";

const LogoText = styled.h1`
  margin: 0;
  font-size: 4rem;
`;

const ColoringSpan = styled.span`
  color: ${({theme}) => theme.colors.primary};
`;

export default () => (
  <LogoText>
    <ColoringSpan>
      Red
    </ColoringSpan>
    <span
      css={`
        color: white;
      `}
    >
      Tetris
    </span>
  </LogoText>
);
