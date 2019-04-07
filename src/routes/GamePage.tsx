import React, { FunctionComponent, useEffect, useState } from 'react';
import {selfpong} from '../gamesLogic/selfpong';
import { RouteComponentProps } from 'react-router-dom';
import firebase from '../firebase';
import {Game} from '../models/Game.model';

const GamePage: FunctionComponent<any> = (props: RouteComponentProps) => {
  const [gameInfo, setGameInfo] = useState<Game>({name: '', complexity: 0});
  const gameId = props.match.params.id;
  let gameCanvas;
  useEffect(() => {
    waitForInformation().then(() => {
      switch(gameInfo.name) {
        case 'Self pong':
          console.log('yo');
          break;
        case 'Other':
          break;
        default:
          // code block
      }
    })
  }, []);

  async function waitForInformation() {
    if (!!props.location.state && !!props.location.state.game) {
      await setGameInfo(props.location.state.game);
    } else {
      await firebase.getOneById('games', gameId).then(data => {
        setGameInfo(data.data());
      })
    }
  }
  return (
    <div className="content-section">
      <h1 className="title">{gameInfo ? gameInfo.name : 'Loading'}</h1>
      <div id="myContainer"></div>
    </div>
  );
}
export default GamePage