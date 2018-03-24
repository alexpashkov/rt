import React, { Component, Fragment } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./styles/index.scss";
import io from "socket.io-client";

import Lobby from "./containers/Lobby";
import Game from "./containers/Game";
import { queryString } from "./utils/index";

class App extends Component {
  componentDidMount() {
    const socket = io.connect("", {
      query: queryString({ id: localStorage.getItem("playerId") })
    });
    socket.on("id", ({ id }) => {
      localStorage.setItem("playerId", id);
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

export default App;
