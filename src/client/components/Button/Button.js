import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
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
const Wrapper = styled.button`
  padding: ${resolveSize};
  border-radius: 300px;
  color: ${({ color }) => (color === 'default' ? '#000' : '#fff')};
  background-color: ${({ color }) => (color === 'default' ? '#fff' : '#e9212d')};
  border: 1px solid
    ${({ color, theme: {colors: {accent}} }) => darken(0.15, color === 'default' ? '#fff' : accent)};
  opacity: 0.9;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
  &:focus {
    outline: none;
  }
`;

const Button = ({ color, size, children, ...rest }) => (
  <Wrapper color={color} size={size} {...rest}>
    {children}
  </Wrapper>
);

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'button']).isRequired,
  color: PropTypes.oneOf(['default', 'primary']).isRequired,
  size: PropTypes.oneOf(['sm', 'm', 'lg']).isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
};

Button.defaultProps = {
  type: 'submit',
  color: 'default',
  size: 'm'
};

export default Button;
