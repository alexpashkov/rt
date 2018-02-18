import React, { Component } from "react";
import { connect } from "react-redux";
import "./lobby.scss";
import * as gamesActions from "../../actions/games";
import GameService from "../../services/game";
import io from "socket.io-client";

import GameItem from "./GameItem";

class Lobby extends Component {
  constructor(props) {
    super(props);

    const socket = io();
    socket.on("GAMES_UPDATE", games => {
      props.gamesSet(games);
    });
  }

  createGame = () => {
    GameService.createGame()
      .then(({data}) => {
        console.log(data);
      })
      .catch(res => {
        console.error(res);
      });
  };

  joinGame = () => {};

  render() {
    const { games } = this.props;
    return (
      <div className="lobby">
        <h1 className="lobby__logo">Nettetris</h1>
        <div className="lobby__games-header">
          <button onClick={this.createGame}>Create Game</button>
        </div>
        <div className="lobby__games">
          {games.map(game => <GameItem key={game.id} {...game} />)}
        </div>
      </div>
    );
  }
}

export default connect(state => ({ games: state.games }), gamesActions)(Lobby);
