import { panelCss } from '../../../components/Panel';
import styled from 'react-emotion';

export const Header = styled.header`
  ${panelCss};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  flex-shrink: 0;
`;

export const Main = styled.main`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const Wrapper = styled.section`
  ${panelCss};
  flex-grow: 1;
`;

export const ButtonsWrapper = styled.div`
    > * {
      margin-left: 10px;
    }
`;
