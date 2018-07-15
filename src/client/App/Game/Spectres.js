import React from 'react';
import styled from 'react-emotion';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const SpectreWrapper = styled.div`
  width: 50%;
  height: 200px;
  background-color: red;
  border: 1px dotted lime;
`;

export default ({ spectres = [] }) => (
  <Wrapper>
    {spectres.length
      ? spectres.map((_, i) => (
          <SpectreWrapper key={i}>Spectre {i}</SpectreWrapper>
        ))
      : 'You are alone'}
  </Wrapper>
);
