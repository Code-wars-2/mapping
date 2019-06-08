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
      draw: 'road'
    }
  }

  componentDidMount(){
    console.log(this.currentMap)
  }

  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default MapEditor;