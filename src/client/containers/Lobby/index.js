import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./styles.scss";
import { gamesSet } from "../../actions/games";
import withSocket from "../../hocs/with-socket";

import GameItem from "../../components/GameItem/index";
import {
  client as clientEvents,
  server as serverEvents
} from "../../../shared/types";

class Lobby extends Component {
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
              key={game.gameId}
              {...game}
            />
          ))}
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { socket, gamesSet } = this.props;
    socket.on(serverEvents.GAMES_UPDATE, gamesSet);
    socket.emit(clientEvents.GAMES_UPDATE_REQUEST);
  }

  createGame = () => {
    const { socket } = this.props;
    socket.emit(clientEvents.GAME_CREATE, ({ status, gameId, description }) => {
      if (status !== "success")
        return console.warn(`Error while creating a game: ${description}`);
      this.navigateToGame(gameId);
    });
  };

  navigateToGame = id => this.props.history.push(`/${id}`);

  componentWillUnmount() {
    const { socket, gamesSet } = this.props;
    socket.removeListener(serverEvents.GAMES_UPDATE, gamesSet);
  }
}

export default withRouter(
  connect(state => ({ games: state.games }), {
    gamesSet
  })(withSocket(Lobby))
);
