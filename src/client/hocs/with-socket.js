import React, { Component } from "react";
import io from "socket.io-client";
import { queryString } from "../utils/index";

const socket = io.connect("", {
  query: queryString({ id: localStorage.getItem("playerId") })
});

window.socket = socket; // for debugging

export default WrappedComponent =>
  class extends Component {
    render() {
      return <WrappedComponent socket={socket} {...this.props}/>;
    }
  };
