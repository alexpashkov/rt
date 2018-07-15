import React from 'react';
import styled from 'react-emotion';
import Board from './Board/Board';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const SpectreWrapper = styled.div`
  width: 50%;
  border: 1px dotted lime;
`;

export default ({ spectres = [] }) => (
  <Wrapper>
    {spectres.length
      ? spectres.map(({ spectre, id }, i) => (
          <SpectreWrapper key={id}>
            <Board board={spectre} />
          </SpectreWrapper>
        ))
      : 'You are alone'}
  </Wrapper>
);
