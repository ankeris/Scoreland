import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Route,
  HashRouter,
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
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

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
    window.addEventListener('load', function() {
      const updateOnlineStatus = (event) => {
        if (event.type == "offline") {
          NotificationManager.warning('No network connection. Some functionalities might be unavailable', 'Offline mode', 5000)
        } else {
          NotificationManager.success('Your browser is online again', 'Online', 5000)
        }
      }
    
      window.addEventListener('online',  updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);
    });
    firebase.isInitialized().then((user) => {
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
    <BrowserRouter >
      <Header setAuth={(e) => setUserAuthenticated(e)} authed={userAuthenticated}/>
      <Switch>
        <Route path="/login" exact render={props => <Login {...props} setAuth={(e) => setUserAuthenticated(e)} />} />
        <Route path="/register" exact render={props => <Register {...props} />} />
        <Route path="/auth" exact render={props => <Auth {...props} />} />
        <PrivateRoute authed={userAuthenticated} path="/library" exact component={Library} />
        <PrivateRoute authed={userAuthenticated} path="/game/:id" exact component={GamePage} />
        <Redirect from="/" to='/library' />
      </Switch>
      <NotificationContainer/>
    </BrowserRouter >
  ) : <Loading />
};
/* <Redirect from="/" to='/library' />
<Route component={NotFound}></Route> */
export default Scoreland;