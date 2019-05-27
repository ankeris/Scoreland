import React, { FunctionComponent, useState, useEffect } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import firebase from "../firebase";

const Header: FunctionComponent<RouteComponentProps> = props => {
    return (
        <header className="App-header bg-dark">
            <div className="flex-row">
                <img className="App-logo" src="logo.svg" alt="" />
                <h1>Scoreland</h1>
                <Link to="/highscores" className="push-horizontal button button--small">
                    Highscores
                </Link>
            </div>
            <div className="flex-row">
                {props.authed ? (
                    <>
                        <div onClick={logout} className="push-horizontal button button--small button--serious button--danger">
                            Logout
                        </div>
                        <div className="push-horizontal">Hi, {localStorage.getItem("user")}</div>
                    </>
                ) : (
                    <div className="push-horizontal">Not logged in</div>
                )}
            </div>
        </header>
    );
    async function logout() {
        console.log("trying to log out");
        await firebase.logout().then(() => {
            props.setAuth(false);
        });
    }
};

export default Header;
