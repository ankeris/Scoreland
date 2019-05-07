import React, { FunctionComponent, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import firebase from "../firebase";
import { Game } from "../models/Game.model";
import DynamicButtoon from "../components/DynamicButton";
import Motivation from "../motivationalQuotes";
import CountUp from "react-countup";
import LinkButton from "../components/LinkButton";
import Loading from "../components/Loading";
// Games
import { selfpong } from "../gamesLogic/selfpong/selfpong";
import { scorebird } from "../gamesLogic/scorebird/sketch";

let gameCanvas;
const GamePage: FunctionComponent<any> = (props: RouteComponentProps) => {
    const [gameInfo, setGameInfo] = useState<Game>({ name: "", complexity: 0, highestScore: 0, highestScorer: "", _id: "" });
    const [gameLost, setGameLost] = useState<Boolean>(false);
    const [score, setScore] = useState<Number>(0);
    const restartGame = () => {
        setGameLost(false);
        const gameId = props.match.params.id;
        firebase.getOneById("games", gameId).then(data => {
            const game: Game = data.data();
            game._id = data.id;
            setGameInfo(game);
        });
    };

    useEffect(() => {
        const gameId = props.match.params.id;
        firebase.getOneById("games", gameId).then(data => {
            const game: Game = data.data();
            game._id = data.id;
            setGameInfo(game);
        });
    }, []);

    useEffect(() => {
        console.log("received: " + gameInfo.name);
        switch (gameInfo.name) {
            case "Self pong":
                gameCanvas = selfpong((score, p5) => {
                    p5.remove();
                    setScore(score);
                    setGameLost(true);
                    console.log(gameInfo.highestScore);

                    if (score > gameInfo.highestScore) {
                        firebase.updateHighestScore(gameInfo._id, score, localStorage.getItem("user"));
                    }
                    return;
                });
                break;
            case "Scorebird":
                gameCanvas = scorebird((score, p5) => {
                    setScore(score);
                    setGameLost(true);
                    console.log(gameCanvas);

                    if (score > gameInfo.highestScore) {
                        firebase.updateHighestScore(gameInfo._id, score, localStorage.getItem("user"));
                    }
                    return;
                });
                break;
            case "Other":
                break;
            default:
            // code block
        }
    }, [gameInfo]);

    useEffect(() => {
        if (gameLost) {
            gameCanvas.remove();
            gameCanvas.clear();
            gameCanvas = null;
        }
    }, [gameLost]);

    return gameInfo ? (
        <div className="content-section content-center">
            <LinkButton text="Go Back" link="/library" modifier="danger" />
            <h1 className="title">{gameInfo.name}</h1>
            {gameLost ? (
                <div className="content-center">
                    <h2>
                        <CountUp end={score} className="title" prefix="score: " />
                    </h2>
                    <div className="grid-box">
                        <LinkButton text="Go Back" link="/library" modifier="danger" />
                        <DynamicButtoon clickHandler={restartGame} name="Restart!" info={Motivation.getRandomQuote()} />
                    </div>
                </div>
            ) : (
                <div id="myContainer" />
            )}
        </div>
    ) : (
        <Loading />
    );
};
export default GamePage;

// async function waitForInformation() {
//   if (!!props.location.state && !!props.location.state.game) {
//     await setGameInfo(props.location.state.game);
//   } else {
//     await firebase.getOneById('games', gameId).then(data => {
//       setGameInfo(data.data());
//     })
//   }
// }
