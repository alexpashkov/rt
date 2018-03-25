import React, { Component, Fragment } from "react";
import withSocket from "./hocs/with-socket";

import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./styles/index.scss";

import Lobby from "./containers/Lobby";
import Game from "./containers/Game";
import { PLAYER_CONNECTED } from "./events";

class App extends Component {
  componentDidMount() {
    const { socket, history } = this.props;
    socket.on(PLAYER_CONNECTED, ({ id, gameId }) => {
      localStorage.setItem("playerId", id);
      gameId && history.push(`/${gameId}`);
    });
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Switch>
            <Route exact path="/" component={Lobby} />
            <Route exact path="/:id" component={Game} />
            <Redirect to="/" />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

function registerSocketEventHandlers(socket) {}

export default withSocket(App);
