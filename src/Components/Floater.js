import React, { Component } from 'react';

class Floater extends Component {
  render() {
    return (
      <div 
      className="hover-coords" 
      style={{ 
        top: this.props.y + 10 , 
        left: this.props.x + 10 ,
        opacity: this.props.mouse
      }}
    >
      <div><strong>X: </strong>{this.props.x}</div> 
      <div><strong>Y: </strong>{this.props.y}</div>
    </div>
    );
  }
}

export default Floater;