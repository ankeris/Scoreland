import React from 'react';
import { Link } from "react-router-dom";

export default ({text, link, modifier}) => 
<Link className={`grid-box__item content-center bg-light button button--${modifier}`} to={{pathname: link}}>
    <h2 className="title">{text}</h2>
</Link>

