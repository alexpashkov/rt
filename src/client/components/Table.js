import styled from 'react-emotion';

export const Table = styled.div`
  display: table;
`;

export const Row = styled.div`
  display: table-row;
  background-color: ${({ theme }) => theme.colors.accent};
`;

export const Cell = styled.div`
  display: table-cell;
  padding: 5px 10px;
  &:first-of-type {
    border-radius: ${props => {
      const { defaultBorderRadius } = props.theme;
      return `${defaultBorderRadius} 0 0 ${defaultBorderRadius}`;
    }};
  }
  &:last-of-type {
    border-radius: ${props => {
      const { defaultBorderRadius } = props.theme;
      return `0 ${defaultBorderRadius} ${defaultBorderRadius} 0 `;
    }};
  }
`;
