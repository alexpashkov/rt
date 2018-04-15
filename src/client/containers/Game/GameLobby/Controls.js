import React, { Component } from "react";
import {getIdFromStorage} from "../../../services/user";

class Controls extends Component {
  isLeader = () => (getIdFromStorage() === this.props.leaderId);
  render() {
    const { startHandler } = this.props;
    const isLeader = this.isLeader();
    return <div>
      <button onClick={startHandler} disabled={!isLeader}>{isLeader ? "Start game" : "Idi nahui"}</button>
    </div>;
  }
}

export default Controls;