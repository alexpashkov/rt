import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./styles.scss";
import { gamesSet } from "../../actions/games";
import withSocket from "../../hocs/with-socket";

import GameItem from "../../components/GameItem/index";
import { GAME_CREATE, GAMES_UPDATE } from "../../events";

class Lobby extends Component {
  componentDidMount() {
    const { socket, gamesSet } = this.props;
    socket.on(GAMES_UPDATE, gamesSet);
  }

  createGame = () => {
    const { socket, history } = this.props;
    socket.emit(GAME_CREATE, res => {
      if (res.status !== "success") {
        return console.warn("Error while creating a game");
      }
    });
  };

  navigateToGame = id => this.props.history.push(`/${id}`);

  render() {
    const { games } = this.props;
    return (
      <div className="lobby">
        <h1 className="lobby__logo">Nettetris</h1>
        <div className="lobby__games-header">
          <button className="primary" onClick={this.createGame}>
            <i className="fas fa-play fa-fw" /> Start Game
          </button>
        </div>
        <div className="lobby__games">
          {games.map(game => (
            <GameItem
              handleJoin={this.navigateToGame}
              key={game.id}
              {...game}
            />
          ))}
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    const { socket, gamesSet } = this.props;
    socket.removeListener(GAMES_UPDATED, gamesSet);
  }
}

export default withRouter(
  connect(state => ({ games: state.games }), {
    gamesSet
  })(withSocket(Lobby))
);
