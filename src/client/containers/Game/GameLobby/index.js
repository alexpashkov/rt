import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "ramda";
import PlayersList from "./PlayersList";
import GameChat from "./GameChat";
import "./GameLobby.scss";

class GameLobby extends Component {
  render() {
    const { id, players } = this.props;
    return (
      <main className="GameLobby">
        <header className="GameLobby__header">
          <h1 className="GameLobby__title">Game {id}</h1>
          <button onClick={this.navigateToLobby}>Back to Lobby</button>
        </header>
        <PlayersList players={players} />
        <GameChat />
      </main>
    );
  }

  navigateToLobby = () => this.props.history.push("/");
}

GameLobby.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      login: PropTypes.string
    })
  )
};

export default compose(
  withRouter,
  connect(state => ({
    id: state.game.info.id,
    players: state.game.info.players
  }))
)(GameLobby);