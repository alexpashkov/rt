import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from "./styled";

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
