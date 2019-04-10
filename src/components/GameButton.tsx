import React, {FunctionComponent} from 'react';
import { Link } from "react-router-dom";
import { Game } from '../models/Game.model';

const GameButton: FunctionComponent<{game: Game}> = ({game}) => {
    const complexityColor = game.complexity < 2 ? 'text-success' : (game.complexity >= 2 && game.complexity < 4 ? 'text-warning' : 'text-danger');
    const toLink = (str) => str.split(' ').join('-')
    return (
      <Link className="grid-box__item bg-light button button--funky"
        to={{
          pathname: "/game/" + game._id,
          state: { game }
        }}>
        <h2 className="title">{game.name}</h2>
        <img className="image" src={game.imagelink} alt=""/>
        <h4>Complexity: <span className={complexityColor}>{game.complexity}</span></h4>
        <p>Highest score: <span>{game.highestScore}</span></p>
        <p>By: <span>{game.highestScorer}🤩</span></p>
      </Link>
    );
}
export default GameButton