import React, { useState } from 'react';
import firebase from '../firebase';
import Loading from '../components/Loading';

export default function SignIn(props) {
const [loading, setLoading] = useState<boolean>(false);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

return !loading ? (
    <form className="form content-section content-center push-vertical" onSubmit={e => {
        e.preventDefault();
        login();
      }}>
      
      <input className="form__input" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
      <input className="form__input" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
      <input className="form__input button button--funky" type="submit" value="Sign In" />
    </form>
) : <Loading />
async function login() {
    setLoading(true);
    try {
      await firebase.login(email, password).then(e => {
        localStorage.setItem('user', e.user.displayName);
        props.history.replace('/library');
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