import React from 'react';

import {
  Switch,
  Route,
  Link,
} from "react-router-dom";

// import FirstDemo from './components/first-demo';
import SecondDemo from './components/second-demo';
import ThridDemo from './components/third-demo';
import Responsive from './components/responsive';

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
          <Link to="/responsive">Responsive - doesn't work</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/responsive">
          <ResponsiveCaller />
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

function ResponsiveCaller() {
  return <Responsive />;
}

export default App;
