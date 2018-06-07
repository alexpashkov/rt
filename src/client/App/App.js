import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { Router, Redirect, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';

import history from '../history';
import store from '../store';
import theme from '../theme';
import '../socket';
import '../styles.js';

import { Wrapper } from './styled';

import Lobby from './Lobby';
import Game from './Game';

const App = () => (
  <Wrapper>
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Lobby} />
            <Route exact path="/:gameId" component={Game} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </ThemeProvider>
    </StoreProvider>
  </Wrapper>
);

export default App;
