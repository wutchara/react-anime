import React from 'react';

import {
  Switch,
  Route,
  Link,
} from "react-router-dom";

// import FirstDemo from './components/first-demo';
import SecondDemo from './components/second-demo';
import ThridDemo from './components/third-demo';

import './App.css';

function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/responsive">Responsive</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/responsive">
          <Responsive />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

function Home() {
  return (<div className="App">
  <header className="App-header">
    <p>
      Hello Ja. Please scroll down....
    </p>
    <br />
    <SecondDemo />
    <br />
    {/* <FirstDemo /> */}
    <br />
    <ThridDemo />
    <br />
  </header>
</div>);
}

function About() {
  return <h2>About</h2>;
}

function Responsive() {
  return <h2>Responsive</h2>;
}

export default App;
