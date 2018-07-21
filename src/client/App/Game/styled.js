import styled from 'react-emotion';
import { panelCss } from '../../components/Panel';

export const Wrapper = styled.div`
  ${panelCss};
  display: flex;
  width: 100%;
  border-radius: 0;
  flex-direction: column;
`;

export const BoardWrapper = styled.div`
  max-width: 350px;
`;

export const SpectresWrapper = styled.div`
  flex-grow: 1;
  margin-left: 20px;
  max-width: 200px;
`;
