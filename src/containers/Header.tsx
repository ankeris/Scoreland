import React, { FunctionComponent, useState, useEffect } from 'react';

const Header: FunctionComponent<{}> = () => {
  return (
    <header className="App-header bg-dark">
        <div className="flex-row">
            <img className="App-logo" src="/logo.svg" alt=""/>
            <h1>Scoreland</h1>
        </div>
    </header>
  );
}

export default Header
