import React, {FunctionComponent} from 'react';
import { Link } from "react-router-dom";
import { Game } from '../models/Game.model';

const GameButton: FunctionComponent<{game: Game}> = ({game}) => {
    const complexityColor = game.complexity < 2 ? 'text-success' : (game.complexity >= 2 && game.complexity < 4 ? 'text-warning' : 'text-danger');
    const toLink = (str) => str.split(' ').join('-')
    return (
      <Link className="grid-box__item bg-light"
        to={{
          pathname: "/game/" + toLink(game.name),
          state: { game }
        }}>
        <h2 className="title">{game.name}</h2>
        <h4>Complexity: <span className={complexityColor}>{game.complexity}</span></h4>
      </Link>
    );
}
export default GameButton