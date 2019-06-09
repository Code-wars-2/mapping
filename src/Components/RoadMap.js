import React, { Component } from 'react';
import { connect } from "react-redux";
import { 
  drawRoads
} from '../Utils/Canvas';

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


class RoadMap extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentDidMount(){

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.roads && nextProps.roads !== this.props.roads) {
      drawRoads("road-map",nextProps.roads,7,"#565656","round");
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
  mapStateToProps
)(RoadMap);