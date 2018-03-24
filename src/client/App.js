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

class App extends Component {
  componentDidMount() {
    registerSocketEventHandlers(this.props.socket);
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

function registerSocketEventHandlers(socket) {
  socket.on("id", ({ id }) => {
    localStorage.setItem("playerId", id);
  });
}

export default withSocket(App);
