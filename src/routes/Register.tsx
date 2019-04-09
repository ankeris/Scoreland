import React, { useState } from 'react';
import firebase from '../firebase';

export default function Register(props) {
const [nickname, setNickname] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

return (
    <form onSubmit={e => { 
        e.preventDefault();
        onRegister();
    }}>
      <input id="nickname" type="text" value={nickname} onChange={e => setNickname(e.target.value)}/>
      <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
      <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
      <input type="submit" value="Sign In" />
    </form>
)
async function onRegister() {
    try {
      await firebase.register(name, email, password);
      props.history.replace('/library');
    } catch (err) {
      alert(err)
    }
  }
}