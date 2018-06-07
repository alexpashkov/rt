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
`;
