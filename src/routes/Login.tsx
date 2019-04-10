import React, { useState } from 'react';
import firebase from '../firebase';
import Loading from '../components/Loading';
import { Link } from "react-router-dom";

export default function SignIn(props) {
const [loading, setLoading] = useState<boolean>(false);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

return !loading ? (
    <form className="form content-section content-center push-vertical bg-neutral" onSubmit={e => {
        e.preventDefault();
        login();
      }}>
      <h2>🎈welcome to <span className="title">SCORELAND</span>🕹️</h2>
      <h2><span className="text-warning">get ready</span> and <span className="text-success">login</span> to adventure</h2>
      <label className="push-top">Email:</label>
      <input className="form__input" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
      <label>Password:</label>
      <input className="form__input" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
      <div className="flex-row full-width">
        <input className="form__input button button--funky button--serious button--small" type="submit" value="Sign In 🔫" />
        <Link to={{pathname: '/register'}} className="button button--danger button--serious button--small">Register 📝</Link>
      </div>
    </form>
) : <Loading />
async function login() {
    setLoading(true);
    try {
      await firebase.login(email, password).then(e => {
        localStorage.setItem('user', e.user.displayName);
        props.setAuth(true);
        props.history.push('/library');
      });
    } catch (err) {
      alert(err)
    }
  }
}
// ------------------- THIS IS HOW TO HANDLE LOGIN -------------------
// firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
//   // user signed in
// }).catch(function(error) {
//    var errorCode = error.code;
//    var errorMessage = error.message;

//    if (errorCode === 'auth/wrong-password') {
//        alert('Wrong password.');
//    } else {
//        alert(errorMessage);         
//    }
//    console.log(error);
// });