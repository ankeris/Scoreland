import React from "react";

export default ({ text, link, modifier }) => (
    <a className={`grid-box__item content-center bg-light button button--${modifier}`} href={link}>
        {text}
    </a>
);
