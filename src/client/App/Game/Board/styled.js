import styled from 'react-emotion';

export const Cell = styled.div`
  border: 1px solid #0f1e33;
  width: 10%;
  padding-top: 10%;
  background-color: ${getCellColor};
  border-radius: 10%;
`;

export const Row = styled.div`
  display: flex;
  height: 5%;
`;

function getCellColor({ cellVal }) {
  if (!cellVal) return 'transparent';
  if (cellVal === -1) return "#000";
  if (cellVal === 1) return '#c52f37';
  if (
    cellVal === 0x0f00 ||
    cellVal === 0x2222 ||
    cellVal === 0x00f0 ||
    cellVal === 0x4444
  )
    return '#c52e37';
  if (
    cellVal === 0x44c0 ||
    cellVal === 0x8e00 ||
    cellVal === 0x6440 ||
    cellVal === 0x0e20
  )
    return '#dfdf36';
  if (
    cellVal === 0x4460 ||
    cellVal === 0x0e80 ||
    cellVal === 0xc440 ||
    cellVal === 0x2e00
  )
    return '#51ce9d';
  if (
    cellVal === 0x0660 ||
    cellVal === 0x0660 ||
    cellVal === 0x0660 ||
    cellVal === 0x0660
  )
    return '#7e46e7';
  if (
    cellVal === 0x06c0 ||
    cellVal === 0x8c40 ||
    cellVal === 0x6c00 ||
    cellVal === 0x4620
  )
    return '#92bed7';
  if (
    cellVal === 0x0e40 ||
    cellVal === 0x4c40 ||
    cellVal === 0x4e00 ||
    cellVal === 0x4640
  )
    return '#8fdb4e';
  if (
    cellVal === 0x0c60 ||
    cellVal === 0x4c80 ||
    cellVal === 0xc600 ||
    cellVal === 0x2640
  )
    return 'orange';
}
