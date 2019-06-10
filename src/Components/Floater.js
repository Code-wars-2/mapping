import React, { Component } from 'react';
import {
  getCartesianCoords
} from '../Utils/Canvas';

class Floater extends Component {
  renderDistance = () => {
    let x1 = this.props.x1;
    let y1 = this.props.y1;
    let x2 = getCartesianCoords(this.props.x,this.props.scale);
    let y2 = getCartesianCoords(this.props.y,this.props.scale);;
    let absX = (x1 - x2) * (x1 - x2);
    let absY = (y1 - y2) * (y1 - y2);
    let distance = Math.sqrt(absX + absY);
    return <span><strong> Distance: </strong>{distance.toFixed(2)}</span>
  }
  render() {
    return (
      <span 
      className="hover-coords" 
      style={{ 
        top: this.props.y + 10 , 
        left: this.props.x + 10 ,
        opacity: this.props.mouse
      }}
    > 
      <strong>X: </strong>{getCartesianCoords(this.props.x,this.props.scale)}
      <strong> Y: </strong>{getCartesianCoords(this.props.y,this.props.scale)}
      {this.props.x1 ? this.renderDistance() : null}
    </span>
    );
  }
}

export default Floater;