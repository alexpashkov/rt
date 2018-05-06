import React, { Component } from "react";

import socket from "../socket";

export default WrappedComponent =>
  class extends Component {
    render() {
      return <WrappedComponent socket={socket} {...this.props} />;
    }
  };
