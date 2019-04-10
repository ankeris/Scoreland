import React, { useState } from 'react';
import firebase from '../firebase';
import { Link } from "react-router-dom";

export default function Register(props) {
const [nickname, setNickname] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

return (
    <form className="form content-section content-center push-vertical bg-neutral" onSubmit={e => {
        e.preventDefault();
        onRegister();
    }}>
      <h2>We're happy to see you join!🎉🐮</h2>
      <label className="push-top">Nickname - how people will see you:</label>
      <input className="form__input" type="text" value={nickname} onChange={e => setNickname(e.target.value)}/>
      <label>Email:</label>
      <input className="form__input" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
      <label>Password:</label>
      <input className="form__input" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
      <div className="flex-row">
        <Link to={{pathname: '/login'}} className="form__input button button--danger button--serious button--small">Go back</Link>
        <input className="form__input button button--funky button--serious button--small" type="submit" value="Finish ✔️" />
      </div>
    </form>
)
async function onRegister() {
    try {
      await firebase.register(nickname, email, password);
      props.history.replace('/library');
    } catch (err) {
      alert(err)
    }
  }
}