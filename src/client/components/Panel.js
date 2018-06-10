import styled, { css } from 'react-emotion';

export const panelCss = props => css`
  background-color: ${props.theme.panel.background};
  border: ${props.theme.panel.border};
  border-radius: ${props.theme.panel.borderRadius};
  padding: ${props.theme.panel.padding};
`;

export const PanelWrapper = styled.div`
  ${panelCss};
`;
