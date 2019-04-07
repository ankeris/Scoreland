import React, { FunctionComponent, useEffect } from 'react';
import {selfpong} from '../gamesLogic/selfpong';

const Game: FunctionComponent<any> = (props) => {
    useEffect(() => {
        // selfpong()
    }, []);
    const game = props.location.state.game || 'not found';
    return (
      <div className="content-section">
        <h1 className="title">{game.name}</h1>
        <div id="myContainer"></div>
      </div>
    );
}
export default Game