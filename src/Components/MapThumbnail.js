import React, { Component } from 'react';
import {
  Card,
} from 'antd';
import { 
  Link
} from 'react-router-dom';

class MapThumbnail extends Component {
  render() {
    return (<Link to={`/${this.props.map.map_id}`}><Card>{this.props.map.name}</Card></Link>)
  }
}

export default MapThumbnail;