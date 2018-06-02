import React from "react";
import { Provider as StoreProvider } from "react-redux";
import { Router, Redirect, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "emotion-theming";

import history from "../history";
import store from "../store";
import theme from "../theme";
import "../socket";
import "../styles.js";

import { AppContainer } from "./styled";

import Lobby from "./Lobby";

const App = () => (
  <AppContainer>
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Lobby} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </ThemeProvider>
    </StoreProvider>
  </AppContainer>
);

export default App;
