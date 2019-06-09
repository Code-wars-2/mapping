let REDUX_FUNCTION = {};

REDUX_FUNCTION['RESIZE_WINDOW'] = (state, action) => { 
  return {
    ...state,
    height: action.payload.height,
    width: action.payload.width,
    offset: action.payload.offset
  }
}

REDUX_FUNCTION['CHANGE_ASSET'] = (state, action) => { 
  return {
    ...state,
    asset: action.payload
  }
}

REDUX_FUNCTION['ADD_ROAD'] = (state, action) => { 
  let roads = JSON.parse(JSON.stringify(state.roads));
  roads.push(action.payload)
  return {
    ...state,
    roads
  }
}

REDUX_FUNCTION['ADD_SHOP'] = (state, action) => { 
  let shops = JSON.parse(JSON.stringify(state.shops));
  shops.push(action.payload)
  return {
    ...state,
    shops
  }
}


export {
  REDUX_FUNCTION
}