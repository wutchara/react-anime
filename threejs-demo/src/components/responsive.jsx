import React, { Component } from "react";
import ResponsiveObject from './responsive-object';

class Responsive extends Component {

  render() {
    return (
      <div
        style={{ height: "100vh" }}
      >
        <ResponsiveObject />
      </div>
    )
  }
}

export default Responsive;