import React, { FunctionComponent, useState, useEffect } from "react";
import { Game } from "../models/Game.model";
import GameButton from "../components/GameButton";
import { selfpong } from "../gamesLogic/selfpong/selfpong";
import Loading from "../components/Loading";

const GameLibrary: FunctionComponent<{ games: Array<Game> }> = props => {
    // Declare a new state variable, which we'll call "count"
    useEffect(() => {}, []);
    const gamesExist: boolean = props.games.length > 0;
    return <React.Fragment>{gamesExist ? props.games.map((game: Game) => <GameButton key={game._id} game={game} />) : <Loading />}</React.Fragment>;
};

export default GameLibrary;

// const [count, setCount] = useState(0);
// <button onClick={() => setCount(count + 1)}>
//   Click me {count}
// </button>
