import React, { Component } from 'react';
import MapThumbnail from '../Components/MapThumbnail';
//import * as ROUTES from '../Config/Routes';

class Maps extends Component {
  constructor(props){
    super(props);
    this.state = {
      maps: [],
      loading: false
    }
  }

  componentDidMount(){
    this.getAllMaps()
  }

  getAllMaps = () => {
    let maps = [];
    for(let i=0;i<4;i++){
      maps.push({ id: i })
    }
    this.setState({
      maps
    })
  }

  renderMapThumbnail = (map , i) => <MapThumbnail key={i} map={map}/>
 

  render() {
    return (
      <div>
        {this.state.maps.map(this.renderMapThumbnail)}
      </div>
    );
  }
}

export default Maps;