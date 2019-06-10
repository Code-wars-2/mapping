import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  drawNavPoints,
  drawNavigation,
} from '../Utils/Canvas';

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
    navPoints: state.globalState.navPoints
  };
};

class NavigationMap extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps && this.props.navigation !== nextProps.navigation){
      drawNavPoints("navigation-map",nextProps.navigation,10,"#336ac4",this.props.scale);
    }
    if(nextProps && this.props.navPoints !== nextProps.navPoints){
      console.log(nextProps.navPoints)
      drawNavigation("navigation-map",nextProps.navPoints,10,"#336ac4","round",this.props.scale);
    }
  }


  render() {
    console.log("Nav")
    return (
    <canvas
      height={this.props.height}
      width={this.props.width}
      className="navigation-map"
      id="navigation-map"
    ></canvas>
    );
  }
}

export default connect(
  mapStateToProps
)(NavigationMap);