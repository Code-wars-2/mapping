import React, { Component } from 'react';
import {
  Row,
  Col,
  Button,
  Tooltip
} from 'antd';
import * as Canvas from '../Components/index';
import { connect } from "react-redux";
import {
  resizeWindow
} from '../Redux/Actions/Window';
import {
  changeAsset
} from '../Redux/Actions/Map';

const mapStateToProps = (state) => {
  return {
    asset: state.globalState.asset,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resizeWindow: (data) => dispatch(resizeWindow(data)),
    changeAsset: (data) => dispatch(changeAsset(data))
  };
};

class MapEditor extends Component {
  constructor(props){
    super(props);
    this.currentMap = this.props.match.params.mapId
    this.state = {
      scale: 20,
    }
  }

  componentDidMount(){
    this.getCanvasSize();
    window.addEventListener('resize',this.getCanvasSize)
  }

  getCanvasSize = () => {
    let data = {};
    data.height = document.getElementsByClassName('map-container')[0].clientHeight;
    data.width = document.getElementsByClassName('map-container')[0].clientWidth;
    data.offset = document.getElementsByClassName('action-container')[0].clientWidth;
    this.props.resizeWindow(data);
  }

  render() {
    return (
      <Row>
        <Col span={4} className="action-container">
          <Button 
            style={this.props.asset === 'road' ? {
              backgroundColor:"#1890ff",
              borderColor:"#1890ff",
              color:"#fff"
            } : null}
            block 
            onClick={()=>this.props.changeAsset('road')}
          >
            Road
          </Button>
          <Button 
            style={this.props.asset === 'shop' ? {
              backgroundColor:"#1890ff",
              borderColor:"#1890ff",
              color:"#fff"
            } : null} 
            block 
            onClick={()=>this.props.changeAsset('shop')}
          >
            Shop
          </Button>
        </Col>
        <Col span={20} className="map-container">
          <Canvas.TracerMap/>
          <Canvas.ShopMap/>
          <Canvas.RoadMap/>
          <Canvas.GridMap/>
        </Col>
      </Row>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapEditor);