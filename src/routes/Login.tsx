import React, { useState } from 'react';
import firebase from '../firebase';

export default function SignIn() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

return (
    <form onSubmit={e => {
      e.preventDefault()
      login();
      }}>
      <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
      <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
      <input type="submit" value="Sign In" />
    </form>
)
async function login() {
    try {
      await firebase.login(email, password).then(e => {
        console.log(e);
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