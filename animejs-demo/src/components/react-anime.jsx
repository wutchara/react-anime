import React from 'react';
import Anime from 'react-anime';

// REF: https://alain.xyz/libraries/react-anime
class CasecadingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ['iphone', 'Google Pixel', 'Xbox one']
    }
  }

  render() {
    const { list } = this.state;
    const animeProps = {
      opacity: [0, 1],
      translateY: [-64, 0],
      delay: (el, i) => i * 200,
    }

    return <Anime {...animeProps}>
      {list.map((v, i) => <div key={i}>{v}</div>)}
    </Anime>
  }
}

export default CasecadingList;