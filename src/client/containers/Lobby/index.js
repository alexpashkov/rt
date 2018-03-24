import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./styles.scss";
import * as gamesActions from "../../actions/games";

import GameItem from "../../components/GameItem/index";

class Lobby extends Component {
  constructor(props) {
    super(props);
  }

  createGame = () => {
    console.log("createGame");
  };

  joinGame = id => {
    console.log("joinGame");
  };

  render() {
    const { games } = this.props;
    return (
      <div className="lobby">
        <h1 className="lobby__logo">Nettetris</h1>
        <div className="lobby__games-header">
          <button onClick={this.createGame}>
            <i className="fas fa-play fa-fw" /> Start Game
          </button>
        </div>
        <div className="lobby__games">
          {games.map(game => (
            <GameItem handleJoin={this.joinGame} key={game.id} {...game} />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(state => ({ games: state.games }), gamesActions)(Lobby)
);
