import React, { FunctionComponent, useEffect, useState } from 'react';
import {selfpong} from '../gamesLogic/selfpong';
import { RouteComponentProps } from 'react-router-dom';
import firebase from '../firebase';
import {Game} from '../models/Game.model';
import DynamicButtoon from '../components/DynamicButton';
import Motivation from '../motivationalQuotes';
import CountUp from 'react-countup';
import LinkButton from '../components/LinkButton';

let gameCanvas;
const GamePage: FunctionComponent<any> = (props: RouteComponentProps) => {
  const [gameInfo, setGameInfo] = useState<Game>({name: '', complexity: 0});
  const [gameLost, setGameLost] = useState<Boolean>(false);
  const [score, setScore] = useState<Number>(0);
  const restartGame = () => {
    setGameLost(false);
    setGameInfo({name: gameInfo.name, complexity: gameInfo.complexity});
  };

  useEffect(() => {
    const gameId = props.match.params.id;
    firebase.getOneById('games', gameId).then(data => {
      setGameInfo(data.data());
    })
  }, [])

  useEffect(() => {
    console.log('received: ' + gameInfo.name);
    switch(gameInfo.name) {
      case 'Self pong':
        gameCanvas = selfpong(score => {
          setScore(score);
          setGameLost(true);
        })
        break;
      case 'Other':
        break;
      default:
        // code block
    }
  }, [gameInfo]);

  useEffect(() => {
    if (gameLost) gameCanvas.remove();
  }, [gameLost])
  
  return (
    <div className="content-section content-center">
      <h1 className="title">{gameInfo ? gameInfo.name : 'Loading'}</h1>
      {gameLost ? 
      <div className="content-center">
        <h2><CountUp end={score} className="title" prefix="score: "/></h2>
        <div className="grid-box">
          <LinkButton text="Go Back" link="/library" modifier="danger"></LinkButton>
          <DynamicButtoon clickHandler={restartGame} name="Restart!" info={Motivation.getRandomQuote()}></DynamicButtoon>
        </div>
      </div>
      : 
      <div id="myContainer"></div>}
    </div>
  );
}
export default GamePage

// async function waitForInformation() {
  //   if (!!props.location.state && !!props.location.state.game) {
  //     await setGameInfo(props.location.state.game);
  //   } else {
  //     await firebase.getOneById('games', gameId).then(data => {
  //       setGameInfo(data.data());
  //     })
  //   }
  // }