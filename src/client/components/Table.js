import styled from 'react-emotion';

export const Table = styled.div`
  display: table;
`;

export const Head = styled.div`
  display: table-header-group;
`;

export const Body = styled.div`
  display: table-row-group;
  color: ${({ theme: { colors } }) => colors.secondaryText};
`;

export const Row = styled.div`
  display: table-row;
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
