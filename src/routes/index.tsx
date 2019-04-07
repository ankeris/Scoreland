import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom'

import Auth from './Auth';
import Login from './Login';
import Library from './Library';
import NotFound from './NotFound';
import Game from './Game';

const checkAuth = () => {
  const token = localStorage.getItem('token');
}

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Library} />
      <Route exact path="/login" render={props => <Login {...props} />} />
      <Route exact path="/library" component={Library} />
      <Route exact path="/auth" render={props => <Auth {...props} />} />
      <Route exact path="/game/:id" render={props => <Game {...props} />} />
      <Route component={NotFound}></Route>
    </Switch>
  </BrowserRouter>
);