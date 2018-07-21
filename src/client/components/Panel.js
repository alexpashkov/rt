import styled, { css } from 'react-emotion';

export const panelCss = ({
  theme: {
    panel: { background, border, borderRadius, padding }
  }
}) => css`
  background-color: ${background};
  border: ${border};
  border-radius: ${borderRadius};
  padding: ${padding};
`;

export const PanelWrapper = styled.div`
  ${panelCss};
`;
