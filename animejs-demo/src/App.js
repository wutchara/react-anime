import './App.css';
import CasecadingList from './components/react-anime';
import MovingLetters from './components/moving-letters';
import Dulations from './components/duration';

// MAIN REF: https://github.com/juliangarnier/anime
function App() {
  return (
    <div className="App">
      <p><h2>LIB: react-anime</h2></p>
      <CasecadingList />
      <hr />
      <hr />
      <MovingLetters />
      <hr />
      <hr />
      <Dulations />
      <hr />
      <hr />
    </div>
  );
}

export default App;
