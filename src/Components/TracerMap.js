import React, { Component } from 'react';
import Floater from './Floater';
import { 
  pointTracer, 
  lineTracer,
  removeTracer
} from '../Utils/Canvas';
import { connect } from "react-redux";
import {
  addRoad,
  addShop
}from '../Redux/Actions/Map';

const mapStateToProps = (state) => {
  return {
    height: state.globalState.height,
    width: state.globalState.width,
    offset: state.globalState.offset,
    scale: state.globalState.scale,
    asset: state.globalState.asset,
    roads: state.globalState.roads,
    shops: state.globalState.shops,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addRoad: (data) => dispatch(addRoad(data)),
    addShop: (data) => dispatch(addShop(data)),
  };
};

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
      roadCount: 0,
      shopX: null,
      shopY: null,
      shops: []
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
    removeTracer("tracer-map");
  }

  getCoords = (e) => {
    var canvas = document.getElementById("tracer-map");
    var ctx = canvas.getContext("2d");
    if(this.props.asset === "road"){
      if(this.state.roadCount === 0){
        this.setState({
          x1: e.clientX - this.props.offset - 1,
          y1: e.clientY - 1,
          roadCount:1,
        })
      }
      else if(this.state.roadCount === 1){
        this.setState({
          x2: e.clientX - this.props.offset - 1,
          y2: e.clientY - 1,
          roadCount:0,
        })
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
      }
      if(this.state.x1 && this.state.y1 && this.state.x2 && this.state.y2){
        this.addPoints();
      }
    }
    if(this.props.asset === 'shop'){
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
    if(this.props.asset === 'road'){
      if(!this.state.x1 && !this.state.y1 && !this.state.x2 && !this.state.y2){
        let x = e.clientX - this.props.offset - 1;
        let y = e.clientY - 1;
        pointTracer("tracer-map",x,y,7,"#565656")
      }
      if(this.state.x1 && this.state.y1 && !this.state.x2 && !this.state.y2){
        let x1 = this.state.x1;
        let y1 = this.state.y1;
        let x2 = e.clientX - this.props.offset - 1;
        let y2 = e.clientY - 1;
        lineTracer("tracer-map",x1,y1,x2,y2,7,"#565656","round")
      }
    }
    if(this.props.asset === 'shop'){
      let x = e.clientX - this.props.offset - 1;
      let y = e.clientY - 1;
      pointTracer("tracer-map",x,y,7,"red")
    }
  }

  addPoints = () => {
    if(this.props.asset === 'road'){
      this.setState({
        shopX: null,
        shopY: null,
      })
      let len = this.props.roads.length;
      let road = {
        name: 'road-'+len,
        x1: this.state.x1,
        y1: this.state.y1,
        x2: this.state.x2,
        y2: this.state.y2
      }
      this.props.addRoad(road)
      //this.drawLine();
      //this.addRoad(this.state.x1,this.state.y1,this.state.x2,this.state.y2,count);
      this.setState({
        x1: null,
        y1: null,
        x2: null,
        y2: null
      })
    }
    else if(this.props.asset === 'shop'){
      this.setState({
        x1: null,
        y1: null,
        x2: null,
        y2: null
      })
      let len = this.props.shops.length;
      let shop = {
        name: 'shop-'+len,
        x: this.state.shopX,
        y: this.state.shopY,
      }
      this.props.addShop(shop)
      //this.drawPoint()
      //this.addShop(this.state.px1,this.state.py1,count);
      this.setState({
        shopX: null,
        shopY: null,
      })
    }
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TracerMap);