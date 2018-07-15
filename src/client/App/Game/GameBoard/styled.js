import styled from 'react-emotion';

export const Cell = styled.div`
  border: 1px solid red;
  width: 10%;
  padding-top: 10%;
  background-color: ${getCellColor};
`;

export const Row = styled.div`
  display: flex;
  height: 5%;
`;

export const BoardWrapper = styled.div`
  width: 100%;
  align-self: flex-start;
  max-width: 400px;
`;

function getCellColor({ cellVal }) {
  if (!cellVal) return '#fff';
  if (
    cellVal === 0x0f00 ||
    cellVal === 0x2222 ||
    cellVal === 0x00f0 ||
    cellVal === 0x4444
  )
    return 'red';
  if (
    cellVal === 0x44c0 ||
    cellVal === 0x8e00 ||
    cellVal === 0x6440 ||
    cellVal === 0x0e20
  )
    return 'yellow';
  if (
    cellVal === 0x4460 ||
    cellVal === 0x0e80 ||
    cellVal === 0xc440 ||
    cellVal === 0x2e00
  )
    return 'green';
  if (
    cellVal === 0x0660 ||
    cellVal === 0x0660 ||
    cellVal === 0x0660 ||
    cellVal === 0x0660
  )
    return 'blue';
  if (
    cellVal === 0x06c0 ||
    cellVal === 0x8c40 ||
    cellVal === 0x6c00 ||
    cellVal === 0x4620
  )
    return 'lightblue';
  if (
    cellVal === 0x0e40 ||
    cellVal === 0x4c40 ||
    cellVal === 0x4e00 ||
    cellVal === 0x4640
  )
    return 'limegreen';
  if (
    cellVal === 0x0c60 ||
    cellVal === 0x4c80 ||
    cellVal === 0xc600 ||
    cellVal === 0x2640
  )
    return 'orange';
}
