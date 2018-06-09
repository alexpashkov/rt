import styled from 'react-emotion';

export const ColoringWrapper = styled.div`
  font-family: 'Passion One', sans-serif;
  color: ${({ theme }) => theme.colors.primaryText};
  background-color: ${({ theme }) => theme.colors.background}}
  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const CenteringWrapper = styled.div`
  display: flex;
  max-width: 1000px;
  min-height: 100vh;
  margin: auto;
`;
