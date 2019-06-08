import React, { Component } from 'react';

class ShopMap extends Component {
  render() {
    return (
      <div>
        <canvas
          height={this.props.height}
          width={this.props.width}
          className="shop-map"
        >
        </canvas>
      </div>
    );
  }
}

export default ShopMap;