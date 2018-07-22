import styled from 'react-emotion';
import { panelCss } from '../../components/Panel';

export const Wrapper = styled.div`
  ${panelCss};
  display: flex;
  width: 100%;
  border-radius: 0;
`;

export const JumboWithBoard = styled.div`
  display: flex;
  justify-content: center;
`;

export const BoardWrapper = styled.div`
  flex-grow: 2;
  max-width: 500px;
`;

export const SpectresWrapper = styled.div`
  flex-grow: 1;
  margin-left: 20px;
  max-width: 200px;
`;
