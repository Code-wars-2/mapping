import React, { Component } from 'react';
import MapThumbnail from '../Components/MapThumbnail';
import {  
  Button ,
  Modal ,
  Input
} from 'antd';
import axios from 'axios';
import * as ROUTES from '../Config/Routes';
import {
  Redirect
} from 'react-router-dom'

class Maps extends Component {
  constructor(props){
    super(props);
    this.state = {
      maps: [],
      loading: false,
      modal: false,
      mapName: null,
      success: false,
      mapId: null
    }
  }

  componentDidMount(){
    this.getAllMaps()
  }

  openModal = () => {
    this.setState({
      modal: true
    })
  }

  closeModal = () => {
    this.setState({
      modal: false
    })
  }

  getMapName = (e) => {
    this.setState({
      mapName: e.target.value
    })
  }

  createMap = () => {
    let name = this.state.mapName;
    let data = {
      name
    }
    if(name.length>3){
      axios.post(ROUTES.ADD_MAP,data)
      .then(response => {
        this.setState({
          success: response.date.success,
          mapId: response.data.map_id
        })
      })
      .catch(error => {
        console.log(error)
      })
    }
  }

  getAllMaps = () => {
    axios.get(ROUTES.GET_ALL_MAPS)
    .then(response => {
      this.setState({
        maps: response.data.maps
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  renderMapThumbnail = (map , i) => <MapThumbnail key={i} map={map}/>
 

  render() {
    if(this.state.success && this.state.mapId){
      return <Redirect to={`/${this.state.mapId}`}/>
    }
    return (
      <div>
        {this.state.maps.map(this.renderMapThumbnail)}
        <Button onClick={this.openModal}>Create New Map</Button>
        <Modal
          title="Create New Map"
          visible={this.state.modal}
          onCancel={this.closeModal}
          onOk={this.createMap}
        >
          <Input type="text" onChange={this.getMapName}/>
        </Modal>
      </div>
    );
  }
}

export default Maps;