import React, { Component } from 'react';
import { connect } from "react-redux";
import { drawShops } from '../Utils/Canvas';

const mapStateToProps = (state) => {
  return {
    height: state.globalState.height,
    width: state.globalState.width,
    offset: state.globalState.offset,
    scale: state.globalState.scale,
    asset: state.globalState.asset,
    shops: state.globalState.shops,
  };
};

class ShopMap extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentDidMount(){

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shops && nextProps.shops !== this.props.shops) {
      drawShops("shop-map",nextProps.shops,7,"red",);
    }
  }

  render() {
    return (
        <canvas
          height={this.props.height}
          width={this.props.width}
          className="shop-map"
          id="shop-map"
        >
        </canvas>
    );
  }
}

export default connect(
  mapStateToProps
)(ShopMap);