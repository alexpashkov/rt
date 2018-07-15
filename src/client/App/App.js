import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { Router, Redirect, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';

import history from '../history';
import store from '../store';
import theme from '../theme';
import '../socket';
import '../globalStyles';

import { ColoringWrapper, CenteringWrapper } from './styled';

import Lobby from './Lobby';
import Game from './Game';

const App = () => (
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
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

export default App;
