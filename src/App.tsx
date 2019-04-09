import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import firebase from './firebase';

import Auth from './routes/Auth';
import Login from './routes/Login';
import Library from './routes/Library';
import NotFound from './routes/NotFound';
import GamePage from './routes/GamePage';
import Register from './routes/Register';

const checkAuth = () => {
  const token = localStorage.getItem('token');
}

const Scoreland = () => {
const [firebaseInitialized, setFirebaseInitialized] = useState<boolean>(false);

useEffect(() => {
  firebase.isInitialized().then((val: boolean) => {
    console.log(val);
    setFirebaseInitialized(val)
  })
}, []);

return firebaseInitialized !== false ? (
  <BrowserRouter>
    <Switch>
      <Route path="/login" render={props => <Login {...props} />} />
      <Route path="/register" render={props => <Register {...props} />} />
      <Route path="/library" component={Library} />
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Route path="/game/:id" render={props => <GamePage {...props} />} />
      <Redirect from="/" to='/library' />
      <Route component={NotFound}></Route>
    </Switch>
  </BrowserRouter>
): <div>Not logged in</div>};

export default Scoreland;