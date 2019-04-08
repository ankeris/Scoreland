import React from 'react';

export default (props) => {
    return (
      <div className="grid-box__item bg-light">
        <h2 className="title">{props.name}</h2>
        <h4>{props.info}</h4>
      </div>
    );
}