import React, { Component } from 'react';
import { connect } from "react-redux";
import { 
  drawRoads
} from '../Utils/Canvas';
import {
  removeRoad
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeRoad: () => dispatch(removeRoad())
  };
};

class RoadMap extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentDidMount(){
    document.getElementById("tracer-map").addEventListener('keydown',this.undoPoint);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.roads && nextProps.roads !== this.props.roads) {
      drawRoads("road-map",nextProps.roads,10,"#565656","round",this.props.scale);
    }
  }

  deleteRoad = () => {
    if(this.props.asset === 'road'){
      let lastRoad = this.props.roads.length-1;
      let data = {
        map_id: this.props.match.params.mapId, 
        name: `road-${lastRoad}`,
        point1: [this.props.roads[lastRoad].x1,this.props.roads[lastRoad].y1],
        point2: [this.props.roads[lastRoad].x2,this.props.roads[lastRoad].y2]
      }
      axios.post(ROUTES.DELETE_MAP_ROAD,data)
        .then(response => {
          if(response.success){
            this.props.removeRoad()
          }
          else{
            console.log("Error")
          }
        })
        .catch(error => {
          console.log("Error")
        })
    }
  }

  undoPoint = (e) => {
    e.preventDefault();
    if(e.keyCode === 90 && (e.metaKey||e.ctrlKey)){
      if(this.props.roads.length){
        this.deleteRoad();
        this.props.removeRoad();
      }
    }
  }

  render() {
    console.log(this.props.roads)
    return (
        <canvas
          height={this.props.height}
          width={this.props.width}
          className="road-map"
          id="road-map"
        >
        </canvas>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoadMap);