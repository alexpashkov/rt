import React from 'react';
import styled from 'react-emotion';
import Board from './Board/Board';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

const SpectreWrapper = styled.div`
  width: 50%;
`;

export default ({ spectres = [] }) => (
  <Wrapper>
    {spectres.length
      ? spectres.sort((a, b) => a.id - b.id).map(({ spectre, id }, i) => (
          <SpectreWrapper key={id}>
            <Board board={spectre} />
          </SpectreWrapper>
        ))
      : 'You are alone'}
  </Wrapper>
);
