import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./styles.scss";
import * as gamesActions from "../../actions/games";
import withSocket from "../../hocs/with-socket";

import GameItem from "../../components/GameItem/index";
import {GAME_CREATE} from "../../events";

class Lobby extends Component {
  // constructor(props) {
  //   super(props);
  // }
  createGame = () => {
    const {socket} = this.props;
    socket.emit(GAME_CREATE, res => {
      if (res.status !== "success") {
        return console.warn("Error while creating a game");
      }
      history.push(`/${res.gameId}`)
    });
  };

  joinGame = id => {
    console.log("joinGame " + id);
    // const {socket, history} = this.props;
    // socket.emit(GAME_JOIN, id, res => {
    //   debugger;
    // });
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

export default withSocket(withRouter(
  connect(state => ({ games: state.games }), gamesActions)(Lobby)
));
