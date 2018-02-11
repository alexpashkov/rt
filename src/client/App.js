import React, { Component, Fragment } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./styles/index.css";

import Game from "./scenes/Game";

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Switch>
            <Route exact path="/game" component={Game} />
            <Redirect to="/game" />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;
