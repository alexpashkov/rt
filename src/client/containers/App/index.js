import React, { Component } from "react";
import styled from "styled-components";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import withSocket from "../../hocs/with-socket";

import "../../styles/index.scss";

import Lobby from "../../containers/Lobby";
import Game from "../../containers/Game";
import { server as serverEvents } from "../../../shared/types";

const AppContainer = styled.div`
  max-width: 1000px;
  margin: auto;
  font-family: "Arimo", sans-serif;
  color: lightgray;
  font-size: 1.6rem;
  line-height: 1.7;
  background-color: $mainBGColor;
`;

class App extends Component {
  componentDidMount() {
    const { socket, history } = this.props;
    socket.on(serverEvents.USER_CONNECTED, ({ id, gameId }) => {
      localStorage.setItem("playerId", id);
      gameId && history.push(`/${gameId}`);
    });
  }

  render() {
    return (
      <AppContainer>
        <Router>
          <Switch>
            <Route exact path="/" component={Lobby} />
            <Route exact path="/:id" component={Game} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </AppContainer>
    );
  }
}

function registerSocketEventHandlers(socket) {}

export default withSocket(App);
