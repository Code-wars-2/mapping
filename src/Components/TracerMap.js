import React, { Component } from 'react';

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
      px1: null,
      px2: null,
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
  }

  getCoords = (e) => {
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
        var canvas = document.getElementById("tracer-map");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
      }
      if(this.state.x1 && this.state.y1 && this.state.x2 && this.state.y2){
        console.log(this.state.x1,this.state.y1,this.state.x2,this.state.y2)
        this.addPoints();
      }
    }
    if(this.props.trace === 'shop'){
      this.setState({
        px1: e.clientX - this.props.offset - 1,
        py1: e.clientY - 1,
      })
      var cns = document.getElementById("tracer-map");
      var context = cns.getContext("2d");
      context.clearRect(0,0,context.canvas.width,context.canvas.height);

      if(this.state.px1 && this.state.py1){
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
    if(this.props.trace === 'road'){
      if(this.state.x1 && this.state.y1 && !this.state.x2 && !this.state.y2){
        let canvas = document.getElementById("tracer-map");
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
        ctx.beginPath();
        ctx.moveTo(this.state.x1,this.state.y1);
        ctx.lineTo(e.clientX - this.props.offset - 1 ,e.clientY - 1);
        ctx.lineWidth = 7;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#565656";
        ctx.stroke();
        ctx.closePath()
      }
    }
  }

  addPoints = () => {
    this.setState({
      x1: null,
      x2: null,
      y1: null,
      y2: null,
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
        <div 
          className="hover-coords" 
          style={{ 
            top: this.state.hoverY + 10 , 
            left: this.state.hoverX + 10 ,
            opacity: this.state.mouse
          }}
        >
          <div><strong>X: </strong>{this.state.hoverX}</div> 
          <div><strong>Y: </strong>{this.state.hoverY}</div>
        </div>
      </div>
    );
  }
}

export default TracerMap;