import React, { Component } from 'react';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    height: state.globalState.height,
    width: state.globalState.width,
    offset: state.globalState.offset,
    scale: state.globalState.scale,
    asset: state.globalState.asset,
  };
};

class GridMap extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  componentDidMount(){
    this.drawBoxGrid();
  }

  componentDidUpdate(prevProps,prevState){
    if(this.props.height !== prevProps.height){
      this.drawBoxGrid();
    }
    if(this.props.width !== prevProps.width){
      this.drawBoxGrid();
    }
    if(this.props.scale !== prevProps.scale){
      this.drawBoxGrid();
    }
  }

  drawBoxGrid = () => {
    let canvas = document.getElementById("grid-map");
    let ctx = canvas.getContext("2d");
    let width = ctx.canvas.width;
    let height = ctx.canvas.height;
    let scale = this.props.scale;

    for(let i = 0 ; i <= height ; i += scale){
      ctx.moveTo(0,i);
      ctx.lineTo(width,i);
      ctx.strokeStyle = "#efefef";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    
    for(let i = 0 ; i <= width ; i += scale){
      ctx.moveTo(i,0);
      ctx.lineTo(i,height);
      ctx.strokeStyle = "#efefef";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  render() {
    return (
        <canvas
          height={this.props.height}
          width={this.props.width}
          className="grid-map"
          id="grid-map"
        >
        </canvas>
    );
  }
}

export default connect(
  mapStateToProps,
)(GridMap);