import React from 'react';

import FirstDemo from './components/first-demo';
import SecondDemo from './components/second-demo';
import ThridDemo from './components/third-demo';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hello Ja. Please scroll down....
        </p>
        <br />
        <SecondDemo />
        <br />
        <FirstDemo />
        <br />
        <ThridDemo />
        <br />
      </header>
    </div>
  );
}

export default App;
