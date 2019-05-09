import React, { FunctionComponent, useEffect, useState, Component } from "react";
import { unmountComponentAtNode } from "react-dom";
import { RouteComponentProps } from "react-router-dom";
import firebase from "../firebase";
import { Game } from "../models/Game.model";
import DynamicButtoon from "../components/DynamicButton";
import Motivation from "../motivationalQuotes";
import CountUp from "react-countup";
import RouterButton from "../components/RouterButton";
import LinkButton from "../components/LinkButton";
import Loading from "../components/Loading";
// Games
import { selfpong } from "../gamesLogic/selfpong/selfpong";
import { scorebird } from "../gamesLogic/scorebird/sketch";
import { scuffedsnake } from "../gamesLogic/scoresnake/sketch";
export default class GamePage extends Component<RouteComponentProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            gameCanvas: null,
            gameInfo: { name: "", complexity: 0, highestScore: 0, highestScorer: "", _id: "" },
            gameLost: false,
            score: 0
        };
    }

    componentDidMount() {
        const gameId = this.props.match.params.id;
        console.log(gameId);
        firebase.getOneById("games", gameId).then(data => {
            const game: Game = data.data();
            game._id = data.id;
            this.setState({
                gameInfo: game
            });
            this.startGame();
        });
    }

    startGame = () => {
        console.log("received: " + this.state.gameInfo.name);
        switch (this.state.gameInfo.name) {
            case "Self pong":
                selfpong(score => {
                    this.setState({
                        gameLost: true,
                        score
                    });
                    this.tryUpdateScore(score);
                    return;
                });
                break;
            case "Scorebird":
                scorebird(score => {
                    this.setState({
                        gameLost: true,
                        score
                    });
                    this.tryUpdateScore(score);
                    return;
                });
                break;
            case "Scuffed Snake":
                scuffedsnake(score => {
                    this.setState({
                        gameLost: true,
                        score
                    });
                    this.tryUpdateScore(score);
                });
                break;
            default:
            // code block
        }
    };

    tryUpdateScore = score => {
        if (score > this.state.gameInfo.highestScore) {
            firebase.updateHighestScore(this.state.gameInfo._id, score, localStorage.getItem("user"));
        }
    };

    clearCanvas = () => {
        this.setState({
            gameCanvas: null
        });
    };

    render() {
        return this.state.gameInfo ? (
            <div className="content-section content-center">
                {/* <RouterButton text="Go Back" link="/library" modifier="danger" /> */}
                <LinkButton modifier="danger" text="Go back" link="/library" />
                <h1 className="title">{this.state.gameInfo.name}</h1>
                {this.state.gameLost ? (
                    <div className="content-center">
                        <h2>
                            <CountUp end={this.state.score} className="title" prefix="score: " />
                        </h2>
                        <p>{Motivation.getRandomQuote()}</p>
                        <div className="grid-box">
                            <LinkButton text="Go Back" link="/library" modifier="danger" />
                            {/* <DynamicButtoon clickHandler={this.restartGame} name="Restart!" info={Motivation.getRandomQuote()} /> */}
                            <LinkButton modifier="success" text="Restart" link={"/game/" + this.state.gameInfo._id} />
                        </div>
                    </div>
                ) : (
                    <div id="myContainer" />
                )}
            </div>
        ) : (
            <Loading />
        );
    }
}
