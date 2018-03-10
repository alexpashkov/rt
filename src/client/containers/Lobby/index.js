import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router";
import "./styles.scss";
import * as gamesActions from "../../actions/games";
import * as gameService from "../../services/game";
import io from "socket.io-client";

import GameItem from "../../components/GameItem/index";

class Lobby extends Component {
  constructor(props) {
    super(props);
    const socket = io();
    socket.on("connect", function () {
    });
    socket.on("GAMES_UPDATE", games => {
      props.gamesSet(games);
    });
  }

  createGame = () => {
    gameService
      .createGame()
      .then(({ data }) => {
        this.joinGame(data.id);
      })
      .catch(res => {
        console.error(res);
      });
  };

  joinGame = id => {
    this.props.history.push("/" + id);
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
