import React, { Component } from 'react';
import Floater from './Floater';

class TracerMap extends Component {
  constructor(props){
    super(props);
    this.state = {
      hoverX: 0,
      hoverY: 0,
      mouse: 0,
      x1: null,
      x2: null,
      y1: null,
      y2: null,
      pointCount: 0,
      shopX: null,
      shopY: null,
    }
  }

  componentDidMount(){
    document.getElementById('tracer-map').addEventListener('mousemove',this.showTrace);
    document.getElementById('tracer-map').addEventListener('mouseout',this.removePos);
    document.getElementById('tracer-map').addEventListener('click',this.getCoords);
  }

  removePos = () => {
    this.setState({
      mouse: 0,
    })
    let canvas = document.getElementById("tracer-map");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  }

  getCoords = (e) => {
    var canvas = document.getElementById("tracer-map");
    var ctx = canvas.getContext("2d");
    if(this.props.trace === "road"){
      if(this.state.pointCount === 0){
        this.setState({
          x1: e.clientX - this.props.offset - 1,
          y1: e.clientY - 1,
          pointCount:1,
        })
      }
      else if(this.state.pointCount === 1){
        this.setState({
          x2: e.clientX - this.props.offset - 1,
          y2: e.clientY - 1,
          pointCount:0,
        })
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
      }
      if(this.state.x1 && this.state.y1 && this.state.x2 && this.state.y2){
        this.addPoints();
      }
    }
    if(this.props.trace === 'shop'){
      this.setState({
        shopX: e.clientX - this.props.offset - 1,
        shopY: e.clientY - 1,
      })
      ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
      if(this.state.shopX && this.state.shopY){
        this.addPoints();
      }
    }
  }

  showTrace = (e) => {
    this.setState({
      mouse: 1,
      hoverX: e.clientX - this.props.offset - 1,
      hoverY: e.clientY - 1,
    })
    let canvas = document.getElementById("tracer-map");
    let ctx = canvas.getContext("2d");
    let thickness = 7;

    if(this.props.trace === 'road'){
      if(!this.state.x1 && !this.state.y1 && !this.state.x2 && !this.state.y2){
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
        ctx.fillStyle = '#565656';
        ctx.beginPath();
        ctx.arc(e.clientX - this.props.offset - 1 ,e.clientY - 1, thickness / 2 , 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
      }
      if(this.state.x1 && this.state.y1 && !this.state.x2 && !this.state.y2){
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
        ctx.beginPath();
        ctx.moveTo(this.state.x1,this.state.y1);
        ctx.lineTo(e.clientX - this.props.offset - 1 ,e.clientY - 1);
        ctx.lineWidth = thickness;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#565656";
        ctx.stroke();
        ctx.closePath()
      }
    }
    

    if(this.props.trace === 'shop'){
      ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(e.clientX - this.props.offset - 1 ,e.clientY - 1, thickness / 2 , 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    }
  }

  addPoints = () => {
    this.setState({
      x1: null,
      x2: null,
      y1: null,
      y2: null,
      shopX: null,
      shopY: null
    })
  }

  render() {
    return (
      <div>
        <canvas
          height={this.props.height}
          width={this.props.width}
          className="tracer-map"
          id="tracer-map"
        >
        </canvas>
        <Floater 
          mouse={this.state.mouse} 
          x={this.state.hoverX} 
          y={this.state.hoverY}
        />
      </div>
    );
  }
}

export default TracerMap;