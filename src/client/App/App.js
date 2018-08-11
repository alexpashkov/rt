import { hot } from 'react-hot-loader';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { Router, Redirect, Switch, Route } from 'react-router-dom';
import ThemeProvider from './ThemeProvider';

import history from '../history';
import store from '../store';
import '../socket';
import '../styles/global';

import { ColoringWrapper, CenteringWrapper } from './styled';

import Lobby from './Lobby';
import Game from './Game';

const App = () => (
  <StoreProvider store={store}>
    <ThemeProvider>
      <ColoringWrapper>
        <CenteringWrapper>
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={Lobby} />
              <Route exact path="/:gameId" component={Game} />
              <Redirect to="/" />
            </Switch>
          </Router>
        </CenteringWrapper>
      </ColoringWrapper>
    </ThemeProvider>
  </StoreProvider>
);

export default hot(module)(App);
