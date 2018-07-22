import styled, { keyframes } from 'react-emotion';
import { darken } from 'polished';

const resolveSize = ({ size }) => {
    switch (size) {
        case 'sm':
            return '0.4em .8em';
        case 'm':
            return '0.6em 1.1em';
        case 'lg':
            return '0.9em 1.6em';
        default:
            throw new Error(`Unknown size ${size}`);
    }
};

export const Wrapper = styled.button`
  padding: ${resolveSize};
  border-radius: 300px;
  color: ${({ color }) => (color === 'default' ? '#000' : '#fff')};
  background-color: ${({ color }) => (color === 'default' ? '#fff' : '#e9212d')};
  border: 1px solid
    ${({ color, theme: {colors: {accent}} }) => darken(0.15, color === 'default' ? '#fff' : accent)};
  opacity: 0.9;
  animation: ${({glowing}) => glowing ? glow + " 1000ms infinite" : "none"};
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
  &:focus {
    outline: none;
  }
`;

const glow = keyframes`
    0% { box-shadow: 0 0 -10px red; }
    40% { box-shadow: 0 0 20px red; }
    60% { box-shadow: 0 0 20px red; }
    100% { box-shadow: 0 0 -10px red; }
`;
