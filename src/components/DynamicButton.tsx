import React from 'react';

export default (props) => {
    return (
      <div onClick={props.clickHandler} className="grid-box__item button button--funky bg-light">
        <h2 className="title">{props.name}</h2>
        <h4>{props.info}</h4>
      </div>
    );
}