import React from 'react';

import FirstDemo from './components/first-demo';
import SecondDemo from './components/second-demo';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hello Ja. Please scroll down....
        </p>
        <SecondDemo />
        <FirstDemo />
      </header>
    </div>
  );
}

export default App;
