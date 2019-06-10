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
  changeAsset,
  addMapAssets
} from '../Redux/Actions/Map';
import axios from 'axios';
import * as ROUTES from '../Config/Routes';

const mapStateToProps = (state) => {
  return {
    asset: state.globalState.asset,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resizeWindow: (data) => dispatch(resizeWindow(data)),
    changeAsset: (data) => dispatch(changeAsset(data)),
    addMapAssets: (data) => dispatch(addMapAssets(data))
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
    this.getMapAssets()
    //window.addEventListener('resize',this.getCanvasSize)
  }

  getMapAssets = () => {
    let id=this.props.match.params.mapId;
    axios.get(ROUTES.GET_MAP_ASSETS(id))
    .then(response => {
      console.log(response.data)
      this.props.addMapAssets(response.data)
    })
    .catch(error => {
      console.log(error)
    })
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
          <Button 
            style={this.props.asset === 'navigate' ? {
              backgroundColor:"#1890ff",
              borderColor:"#1890ff",
              color:"#fff"
            } : null} 
            block 
            onClick={()=>this.props.changeAsset('navigate')}
          >
            Navigate
          </Button>
        </Col>
        <Col span={20} className="map-container">
          <Canvas.TracerMap mapId={this.props.match.params.mapId}/>
          <Canvas.NavigationMap/>
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