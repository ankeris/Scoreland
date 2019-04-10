import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import firebase from './firebase';
import Header from './containers/Header';
import Auth from './routes/Auth';
import Login from './routes/Login';
import Library from './routes/Library';
import NotFound from './routes/NotFound';
import GamePage from './routes/GamePage';
import Register from './routes/Register';
import Loading from './components/Loading';

const checkAuth = () => {
  const token = localStorage.getItem('token');
}

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

const Scoreland = () => {
  const [userAuthenticated, setUserAuthenticated] = useState<boolean>(false);
  const [firebaseLoaded, setFirebaseLoaded] = useState<boolean>(false);

  useEffect(() => {
    firebase.isInitialized().then((user) => {
      console.log(user);
      if (user) {
        setUserAuthenticated(true);
        setFirebaseLoaded(true);
      }
      else  {
        setFirebaseLoaded(true);
        setUserAuthenticated(false)
      };
    })
  }, []);

  return firebaseLoaded ? (
    <BrowserRouter>
      <Header setAuth={(e) => setUserAuthenticated(e)} authed={userAuthenticated}/>
      <Switch>
        <Route path="/login" render={props => <Login {...props} setAuth={(e) => setUserAuthenticated(e)} />} />
        <Route path="/register" render={props => <Register {...props} />} />
        <Route path="/auth" render={props => <Auth {...props} />} />
        <PrivateRoute authed={userAuthenticated} path="/library" component={Library} />
        <PrivateRoute authed={userAuthenticated} path="/game/:id" component={GamePage} />
        <Redirect from="/" to='/library' />
      </Switch>
    </BrowserRouter>
  ) : <Loading />
};
/* <Redirect from="/" to='/library' />
<Route component={NotFound}></Route> */
export default Scoreland;