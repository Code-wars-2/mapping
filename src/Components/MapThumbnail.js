import React, { Component } from 'react';
import {
  Card,
} from 'antd';
import { 
  Link
} from 'react-router-dom';

class MapThumbnail extends Component {
  render() {
    return (<Link to={`/${this.props.map.id}`}><Card>{this.props.map.id}</Card></Link>)
  }
}

export default MapThumbnail;