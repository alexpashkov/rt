import React from "react";
import styled from "react-emotion";
import PropTypes from "prop-types";

const StyldButton = styled.button`
  padding: 10px 20px;
  border-radius: 300px;
  color: white;
  background-color: red;
  border: none;
`;

const Button = ({ children, ...props }) => (
  <StyldButton {...props}>{children}</StyldButton>
);

Button.propTypes = {
  type: PropTypes.oneOf(["submit", "button"]).isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

Button.defaultProps = {
  type: "submit"
};

export default Button;
