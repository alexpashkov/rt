import React, { Component } from "react";
import io from "socket.io-client";
import { queryString } from "../utils/index";

const socket = io.connect("", {
  query: queryString({ id: localStorage.getItem("playerId") })
});

export default WrappedComponent =>
  class extends React.Component {
    render() {
      return <WrappedComponent socket={socket} {...this.props}/>;
    }
  };
