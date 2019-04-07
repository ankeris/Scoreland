import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'

import Auth from './Auth';
import Login from './Login';
import Library from './Library';
import NotFound from './NotFound';
import GamePage from './GamePage';

const checkAuth = () => {
  const token = localStorage.getItem('token');
}

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" render={props => <Login {...props} />} />
      <Route path="/library" component={Library} />
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Route path="/game/:id" render={props => <GamePage {...props} />} />
      <Redirect from="/" to='/library' />
      <Route component={NotFound}></Route>
    </Switch>
  </BrowserRouter>
);