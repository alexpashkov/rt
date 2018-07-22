import styled, { css } from 'react-emotion';

export const secondaryTextColor = ({
  theme: {
    colors: { secondaryText }
  }
}) => css`
  color: ${secondaryText};
`;
