import React, { Component } from 'react';
import {
  Row,
  Col,
  Button,
  Tooltip
} from 'antd';
import * as Canvas from '../Components/index';


class MapEditor extends Component {
  constructor(props){
    super(props);
    this.currentMap = this.props.match.params.mapId
    this.state = {
      draw: 'road',
      height: 0,
      width: 0,
      scale: 20,
      offset: 0,
    }
  }

  componentDidMount(){
    this.getCanvasSize();
  }

  getCanvasSize = () => {
    let height = document.getElementsByClassName('map-container')[0].offsetHeight;
    let width = document.getElementsByClassName('map-container')[0].offsetWidth;
    let offset = document.getElementsByClassName('action-container')[0].offsetWidth;
    this.setState({
      height,
      width,
      offset
    })
  }

  componentDidUpdate(prevProps,prevState){
    if(prevState.height!==this.state.height){
      this.setState({
        height:this.state.height
      })
    }
    if(prevState.width!==this.state.width){
      this.setState({
        width:this.state.width
      })
    }
  }

  render() {
    return (
      <Row>
        <Col span={4} className="action-container">
          <Button 
            style={this.state.draw === 'road' ? {
              backgroundColor:"#1890ff",
              borderColor:"#1890ff",
              color:"#fff"
            } : null}
            block 
            onClick={()=>{ this.setState({ draw: 'road' }) }}
          >
            Road
          </Button>
          <Button 
            style={this.state.draw === 'shop' ? {
              backgroundColor:"#1890ff",
              borderColor:"#1890ff",
              color:"#fff"
            } : null} 
            block 
            onClick={()=>{ this.setState({ draw: 'shop' }) }}
          >
            Shop
          </Button>
        </Col>
        <Col span={20} className="map-container">
          <Canvas.TracerMap 
            trace={this.state.draw}
            height={this.state.height} 
            width={this.state.width}
            scale={this.state.scale}
            offset={this.state.offset}
          />
          <Canvas.ShopMap
            height={this.state.height} 
            width={this.state.width}
            scale={this.state.scale}
            offset={this.state.offset}
          />
          <Canvas.RoadMap
            height={this.state.height} 
            width={this.state.width}
            scale={this.state.scale}
            offset={this.state.offset}
          />
          <Canvas.GridMap 
            height={this.state.height} 
            width={this.state.width}
            scale={this.state.scale}
          />
        </Col>
      </Row>
    );
  }
}

export default MapEditor;