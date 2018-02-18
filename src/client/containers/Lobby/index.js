import React, { Component } from "react";
import { connect } from "react-redux";
import "./lobby.scss";

import GameItem from "./GameItem";

class Lobby extends Component {
  render() {
    const { games } = this.props;
    return (
      <div className="lobby">
        <h1 className="lobby__logo">Nettetris</h1>
        <div className="lobby__games-header">
          <button>Create Game</button>
        </div>
        <div className="lobby__games">
          {games.map(game => <GameItem {...game} />)}
        </div>
      </div>
    );
  }
}

export default connect(state => ({ games: state.games }))(Lobby);
