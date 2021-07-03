import React from 'react';
import anime from "animejs";

import './moving-letters.css';

// REF: https://tobiasahlin.com/moving-letters/
class MovingLetters extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // Make the letters moving
    var textWrapper = document.querySelector('.ml6 .letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    // Make the letters show-hide
    var basicTimeline = anime.timeline({ loop: true });
    basicTimeline
      .add({
        targets: '.ml6 .letter',
        translateY: ["1.1em", 0],
        translateZ: 0,
        duration: 750,
        delay: (el, i) => 50 * i
      }).add({
        targets: '.ml6',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
      });
  }
  componentDidUpdate() { }

  render() {
    return <h1 className="ml6">
      <span className="text-wrapper">
        <span className="letters">Hello Ham NaJa....</span>
      </span>
    </h1>;
  }
}

export default MovingLetters;