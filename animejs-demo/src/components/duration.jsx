import React from 'react';
import anime from "animejs";

// REF: https://tobiasahlin.com/moving-letters/
class Dulations extends React.Component {
  state = {
    animationDulation: null,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const animation = anime({
      targets: '.el',
      translateX: 300,
      duration: 10000
    });
    this.setState({
      ...this.state,
      animationDulation: animation,
    });
  }
  componentDidUpdate() { }

  render() {
    return <div>
      <div className='el' style={{
        'background-color': 'cyan',
        'height': '100px',
        'width': '100px'
      }}></div>
      <button onClick={this.state.animationDulation?.play}>Play</button>
      <button onClick={this.state.animationDulation?.pause}>Pause</button>
      <button onClick={this.state.animationDulation?.restart}>Restart</button>
    </div>;
  }
}

export default Dulations;