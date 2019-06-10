import React, { Component } from 'react';
import Floater from './Floater';
import { 
  pointTracer, 
  lineTracer,
  removeTracer,
  getCartesianCoords
} from '../Utils/Canvas';
import { connect } from "react-redux";
import {
  addRoad,
  addShop,
  removeRoad,
  removeShop,
  addNavigation,
  navigateMap
} from '../Redux/Actions/Map';
import axios from 'axios';
import * as ROUTES from '../Config/Routes';

const mapStateToProps = (state) => {
  return {
    height: state.globalState.height,
    width: state.globalState.width,
    offset: state.globalState.offset,
    scale: state.globalState.scale,
    asset: state.globalState.asset,
    roads: state.globalState.roads,
    shops: state.globalState.shops,
    navigation: state.globalState.navigation,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addRoad: (data) => dispatch(addRoad(data)),
    addShop: (data) => dispatch(addShop(data)),
    addNavigation: (data) => dispatch(addNavigation(data)),
    navigateMap: (data) => dispatch(navigateMap(data)),
    removeRoad: () => dispatch(removeRoad()),
    removeShop: () => dispatch(removeShop())
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
      navCount: 0,
      shopX: null,
      shopY: null,
      shops: [],
      distance: false,
      navX1: null,
      navX2: null,
      navY1: null,
      navY2: null,
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
        let x = e.clientX - this.props.offset - 1;
        let y = e.clientY - 1;
        let scale = this.props.scale;
        var snappedX1 = ((x - (x % scale)) + (x + (scale - (x % scale))))/2;
        var snappedY1 = ((y - (y % scale)) + (y + (scale - (y % scale))))/2;
        this.setState({
          x1: snappedX1,
          y1: snappedY1,
          roadCount:1,
          distance: true
        })
      }
      else if(this.state.roadCount === 1){
        let x = e.clientX - this.props.offset - 1;
        let y = e.clientY - 1;
        let scale = this.props.scale;
        var snappedX2 = ((x - (x % scale)) + (x + (scale - (x % scale))))/2;
        var snappedY2 = ((y - (y % scale)) + (y + (scale - (y % scale))))/2;
        this.setState({
          x2: snappedX2,
          y2: snappedY2,
          roadCount:0,
          distance: false
        })
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
      }
      if(this.state.x1 && this.state.y1 && this.state.x2 && this.state.y2){
        this.addPoints();
      }
    }
    if(this.props.asset === 'shop'){
      let x = e.clientX - this.props.offset - 1;
      let y = e.clientY - 1;
      let scale = this.props.scale; 
      var snappedX = ((x - (x % scale)) + (x + (scale - (x % scale))))/2;
      var snappedY = ((y - (y % scale)) + (y + (scale - (y % scale))))/2;
      this.setState({
        shopX: snappedX,
        shopY: snappedY,
        distance: false
      })
      ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
      if(this.state.shopX && this.state.shopY){
        this.addPoints();
      }
    }
    if(this.props.asset === 'navigate'){
      if(this.state.navCount === 0){
        let x = e.clientX - this.props.offset - 1;
        let y = e.clientY - 1;
        let scale = this.props.scale;
        var snappedNavX1 = ((x - (x % scale)) + (x + (scale - (x % scale))))/2;
        var snappedNavY1 = ((y - (y % scale)) + (y + (scale - (y % scale))))/2;
        this.setState({
          navX1: snappedNavX1,
          navY1: snappedNavY1,
          navCount:1
        })
      }
      else if(this.state.navCount === 1){
        let x = e.clientX - this.props.offset - 1;
        let y = e.clientY - 1;
        let scale = this.props.scale;
        var snappedNavX2 = ((x - (x % scale)) + (x + (scale - (x % scale))))/2;
        var snappedNavY2 = ((y - (y % scale)) + (y + (scale - (y % scale))))/2;
        this.setState({
          navX2: snappedNavX2,
          navY2: snappedNavY2,
          navCount:0,
        })
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
      }
      if(this.state.navX1 && this.state.navY1 && this.state.navX2 && this.state.navY2){
        this.addPoints();
      }
    }
  }

  showTrace = (e) => {
    let x = e.clientX - this.props.offset - 1;
    let y = e.clientY - 1;
    let scale = this.props.scale; 
    var snappedX = ((x - (x % scale)) + (x + (scale - (x % scale))))/2;
    var snappedY = ((y - (y % scale)) + (y + (scale - (y % scale))))/2;
    this.setState({
      mouse: 1,
      hoverX: snappedX,
      hoverY: snappedY,
    })
    if(this.props.asset === 'road'){
      if(!this.state.x1 && !this.state.y1 && !this.state.x2 && !this.state.y2){
        let x = e.clientX - this.props.offset - 1;
        let y = e.clientY - 1;
        pointTracer("tracer-map",x,y,10,"#565656",this.props.scale)
      }
      if(this.state.x1 && this.state.y1 && !this.state.x2 && !this.state.y2){
        let x1 = this.state.x1;
        let y1 = this.state.y1;
        let x2 = e.clientX - this.props.offset - 1;
        let y2 = e.clientY - 1;
        lineTracer("tracer-map",x1,y1,x2,y2,10,"#565656","round",this.props.scale)
      }
    }
    if(this.props.asset === 'shop'){
      let x = e.clientX - this.props.offset - 1;
      let y = e.clientY - 1;
      pointTracer("tracer-map",x,y,10,"red",this.props.scale)
    }
    if(this.props.asset === 'navigate'){
      if(!this.state.navX1 && !this.state.navY2 && !this.state.navX2 && !this.state.navY2){
        let x = e.clientX - this.props.offset - 1;
        let y = e.clientY - 1;
        pointTracer("tracer-map",x,y,10,"#336ac4",this.props.scale)
      }
      if(this.state.navX1 && this.state.navY1 && !this.state.navX2 && !this.state.navY2){
        let x2 = e.clientX - this.props.offset - 1;
        let y2 = e.clientY - 1;
        pointTracer("tracer-map",x2,y2,10,"#336ac4",this.props.scale)
      }
    }
  }

  addPoints = () => {
    if(this.props.asset === 'road'){
      this.setState({
        shopX: null,
        shopY: null,
        navX1: null,
        navY1: null,
        navX2: null,
        navY2: null,
      })
      let len = this.props.roads.length;
      let road = {
        name: 'road-'+len,
        x1: getCartesianCoords(this.state.x1,this.props.scale),
        y1: getCartesianCoords(this.state.y1,this.props.scale),
        x2: getCartesianCoords(this.state.x2,this.props.scale),
        y2: getCartesianCoords(this.state.y2,this.props.scale)
      }
      this.props.addRoad(road)
      this.addRoad();
      this.setState({
        x1: null,
        y1: null,
        x2: null,
        y2: null,
        distance: false
      })
    }
    else if(this.props.asset === 'shop'){
      this.setState({
        x1: null,
        y1: null,
        x2: null,
        y2: null,
        navX1: null,
        navY1: null,
        navX2: null,
        navY2: null,
        distance: false
      })
      let len = this.props.shops.length;
      let shop = {
        name: 'shop-'+len,
        x: getCartesianCoords(this.state.shopX,this.props.scale),
        y: getCartesianCoords(this.state.shopY,this.props.scale),
      }
      this.props.addShop(shop);
      this.addShop()
      this.setState({
        shopX: null,
        shopY: null,
      })
    }
    else if(this.props.asset === 'navigate') {
      this.setState({
        shopX: null,
        shopY: null,
        x1: null,
        y1: null,
        x2: null,
        y2: null,
      })
      let navigate = {
        x1: getCartesianCoords(this.state.navX1,this.props.scale),
        y1: getCartesianCoords(this.state.navY1,this.props.scale),
        x2: getCartesianCoords(this.state.navX2,this.props.scale),
        y2: getCartesianCoords(this.state.navY2,this.props.scale)
      }
      this.props.addNavigation(navigate);
      this.navigate();
      this.setState({
        navX1: null,
        navY1: null,
        navX2: null,
        navY2: null,
        distance: false
      })
    }
  }

  addRoad = () => {
    let data = this.props.roads[this.props.roads.length-1];
    data.map_id = +this.props.mapId;
    data.point1 = [data.x1,data.y1];
    data.point2 = [data.x2,data.y2];

    axios.post(ROUTES.ADD_MAP_ROAD,data)
    .then(response => {
      if(!response.data.success){
        this.props.removeRoad()
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  addShop = () => {
    let data = this.props.shops[this.props.shops.length-1];
    data.map_id = +this.props.mapId;
    data.point = [data.x,data.y];

    axios.post(ROUTES.ADD_MAP_SHOP,data)
    .then(response => {
      if(!response.data.success){
        this.props.removeShop()
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  navigate = () => {
    let data = this.props.navigation;
    data.map_id = +this.props.mapId;
    data.point1 = [data.x1,data.y1];
    data.point2 = [data.x2,data.y2];

    axios.post(ROUTES.NAVIGATE_MAP,data)
    .then(response => {
      if(response.data.success){
        this.props.navigateMap(response.data)
      }
    })
    .catch(error => {
      console.log(error)
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
          scale={this.props.scale}
          distance={this.state.distance}
          x1={getCartesianCoords(this.state.x1,this.props.scale)}
          y1={getCartesianCoords(this.state.y1,this.props.scale)}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TracerMap);