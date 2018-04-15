/* vendor imports */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "ramda";

/* proprietary imports */
import { client as clientSocketEvents, server as serverSocketEvents } from "../../../../shared/types";
import withSocket from "../../../hocs/with-socket";
import Controls from "./Controls";
import PlayersList from "./PlayersList";
import GameChat from "./GameChat";
import "./GameLobby.scss";

class GameLobby extends Component {
  render() {
    const { id, players, isRunning, leaderId } = this.props;
    return (
      <main className="GameLobby">
        <header className="GameLobby__header">
          <h1 className="GameLobby__title">Game {id}</h1>
          <button onClick={this.navigateToLobby}>Back to Lobby</button>
        </header>
        <Controls
          isRunning={isRunning}
          leaderId={leaderId}
          startHandler={this.startHandler}
        />
        <PlayersList players={players} />
        <GameChat />
      </main>
    );
  }
  componentDidMount() {
    const { socket } = this.props;
    socket.on(serverSocketEvents.GAME_STARTED, console.log);
  }

  startHandler = () => {
    console.log("Game start request");
    const { socket } = this.props;
    socket.emit(clientSocketEvents.GAME_START, console.log);
  };
  navigateToLobby = () => this.props.history.push("/");
}

GameLobby.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      login: PropTypes.string
    })
  ),
  id: PropTypes.string,
  isRunning: PropTypes.bool,
  leaderId: PropTypes.string
};

export default compose(
  withSocket,
  withRouter,
  connect(state => ({
    id: state.game.info.id,
    players: state.game.info.players,
    isRunning: state.game.info.isRunning,
    leaderId: state.game.info.leaderId
  }))
)(GameLobby);
