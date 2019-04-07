import React, { FunctionComponent, useState, useEffect } from 'react';
import { Game } from '../models/Game.model';
import GameButton from '../components/GameButton';
import {selfpong} from '../gamesLogic/selfpong';

const GameLibrary: FunctionComponent<{games: Array<Game>}> = (props) => {
  // Declare a new state variable, which we'll call "count"
  useEffect(()=> {
  }, [])
  const gamesExist: boolean = props.games.length > 0;
  return (
    <React.Fragment>
      {
        gamesExist ? props.games.map((game: Game) => 
        <GameButton key={game._id} game={game}></GameButton>
        ) : <h1>loading games...</h1>
      }
    </React.Fragment>
  );
}

export default GameLibrary

// const [count, setCount] = useState(0);
// <button onClick={() => setCount(count + 1)}>
//   Click me {count}
// </button>