import React, { Component } from 'react';

class RoadMap extends Component {
  render() {
    return (
      <div>
        <canvas
          height={this.props.height}
          width={this.props.width}
          className="road-map"
        >
        </canvas>
      </div>
    );
  }
}

export default RoadMap;