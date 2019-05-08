import React, { FunctionComponent, useEffect, useState, Component } from "react";
import { unmountComponentAtNode } from "react-dom";
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

// const GamePage: FunctionComponent<any> = (props: RouteComponentProps) => {
//     const [gameCanvas, setGameCanvas] = useState<any>(null);
//     const [gameInfo, setGameInfo] = useState<Game>({ name: "", complexity: 0, highestScore: 0, highestScorer: "", _id: "" });
//     const [gameLost, setGameLost] = useState<Boolean>(false);
//     const [score, setScore] = useState<Number>(0);

//     const restartGame = () => {
//         setGameLost(false);
//         const gameId = props.match.params.id;
//         firebase.getOneById("games", gameId).then(data => {
//             const game: Game = data.data();
//             game._id = data.id;
//             setGameInfo(game);
//         });
//     };

//     useEffect(() => {
//         const gameId = props.match.params.id;
//         firebase.getOneById("games", gameId).then(data => {
//             const game: Game = data.data();
//             game._id = data.id;
//             setGameInfo(game);
//         });
//     }, []);

//     useEffect(() => {
//         console.log("received: " + gameInfo.name);
//         switch (gameInfo.name) {
//             case "Self pong":
//                 setGameCanvas(
//                     selfpong(score => {
//                         setScore(score);
//                         setGameLost(true);
//                         console.log(gameInfo.highestScore);

//                         if (score > gameInfo.highestScore) {
//                             firebase.updateHighestScore(gameInfo._id, score, localStorage.getItem("user"));
//                         }
//                         return;
//                     })
//                 );
//                 break;
//             case "Scorebird":
//                 setGameCanvas(
//                     scorebird(score => {
//                         setScore(score);
//                         setGameLost(true);

//                         if (score > gameInfo.highestScore) {
//                             firebase.updateHighestScore(gameInfo._id, score, localStorage.getItem("user"));
//                         }
//                         return;
//                     })
//                 );
//                 break;
//             case "Other":
//                 break;
//             default:
//             // code block
//         }
//     }, [gameInfo]);

//     useEffect(() => {
//         if (gameLost) {
//             unmountComponentAtNode(document.getElementById("root") as any);
//             gameCanvas.remove();
//             gameCanvas.clear();
//             setGameCanvas(null);
//         }
//     }, [gameLost]);

//     return gameInfo ? (
//         <div className="content-section content-center">
//             <LinkButton text="Go Back" link="/library" modifier="danger" />
//             <h1 className="title">{gameInfo.name}</h1>
//             {gameLost ? (
//                 <div className="content-center">
//                     <h2>
//                         <CountUp end={score} className="title" prefix="score: " />
//                     </h2>
//                     <div className="grid-box">
//                         <LinkButton text="Go Back" link="/library" modifier="danger" />
//                         <DynamicButtoon clickHandler={restartGame} name="Restart!" info={Motivation.getRandomQuote()} />
//                     </div>
//                 </div>
//             ) : (
//                 <div id="myContainer" />
//             )}
//         </div>
//     ) : (
//         <Loading />
//     );
// };
// export default GamePage;

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
        firebase.getOneById("games", gameId).then(data => {
            const game: Game = data.data();
            game._id = data.id;
            this.setState({
                gameInfo: game
            });
            this.startGame();
        });
    }

    restartGame = () => {
        this.setState({
            gameLost: false
        });

        // const gameId = this.props.match.params.id;
        // firebase.getOneById("games", gameId).then(data => {
        //     const game: Game = data.data();
        //     game._id = data.id;
        //     this.setState({
        //         gameInfo: game
        //     });
        //     this.startGame();
        // });
    };

    startGame = () => {
        console.log("received: " + this.state.gameInfo.name);
        switch (this.state.gameInfo.name) {
            case "Self pong":
                const smth = selfpong(score => {
                    this.setState({
                        gameLost: true
                    });
                    smth.clear();
                    smth.remove();

                    if (score > this.state.gameInfo.highestScore) {
                        firebase.updateHighestScore(this.state.gameInfo._id, score, localStorage.getItem("user"));
                    }
                    return;
                });

                break;
            case "Scorebird":
                this.setState({
                    gameCanvas: scorebird(score => {
                        this.setState({
                            gameLost: true
                        });
                        this.clearCanvas();
                        if (score > this.state.gameInfo.highestScore) {
                            firebase.updateHighestScore(this.state.gameInfo._id, score, localStorage.getItem("user"));
                        }
                        return;
                    })
                });
                break;
            case "Other":
                break;
            default:
            // code block
        }
    };

    clearCanvas = () => {
        this.setState({
            gameCanvas: null
        });
    };

    // useEffect(() => {
    //     if (gameLost) {
    //         unmountComponentAtNode(document.getElementById("root") as any);
    //         gameCanvas.remove();
    //         gameCanvas.clear();
    //         setGameCanvas(null);
    //     }
    // }, [gameLost]);

    // render will know everything!
    render() {
        return this.state.gameInfo ? (
            <div className="content-section content-center">
                {/* <LinkButton text="Go Back" link="/library" modifier="danger" /> */}
                <a className="grid-box__item content-center bg-light button button--danger" href="/library">
                    Go Back
                </a>
                <h1 className="title">{this.state.gameInfo.name}</h1>
                {this.state.gameLost ? (
                    <div className="content-center">
                        <h2>
                            <CountUp end={this.state.score} className="title" prefix="score: " />
                        </h2>
                        <div className="grid-box">
                            <LinkButton text="Go Back" link="/library" modifier="danger" />
                            <DynamicButtoon clickHandler={this.restartGame} name="Restart!" info={Motivation.getRandomQuote()} />
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
