import React from "react";
import { Redirect, Link } from "react-router-dom";

export default ({ text, link, modifier }) => {
    return (
    <Link className={`grid-box__item content-center bg-light button button--${modifier}`} to={link}>
        {text}
    </Link>
)};
