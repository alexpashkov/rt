import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

const resolveSize = ({ size }) => {
  switch (size) {
    case 'sm':
      return '0.4em .8em';
    case 'm':
      return '0.7em 1.2em';
    default:
      throw new Error(`Unknown size ${size}`);
  }
};
const StyldButton = styled.button`
  padding: ${resolveSize};
  border-radius: 300px;
  color: ${({ color }) => (color === 'default' ? '#000' : '#fff')};
  background-color: ${({ color }) => (color === 'default' ? '#fff' : '#f00')};
  border: none;
`;

const Button = ({ color, size, children, ...rest }) => (
  <StyldButton color={color} size={size} {...rest}>
    {children}
  </StyldButton>
);

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'button']).isRequired,
  color: PropTypes.oneOf(['default', 'primary']).isRequired,
  size: PropTypes.oneOf(['sm', 'm']).isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
};

Button.defaultProps = {
  type: 'submit',
  color: 'default',
  size: 'm'
};

export default Button;
