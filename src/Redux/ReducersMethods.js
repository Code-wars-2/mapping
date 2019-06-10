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

REDUX_FUNCTION['ADD_MAP_ASSETS'] = (state, action) => { 
  let roads = JSON.parse(JSON.stringify(state.roads));
  let shops = JSON.parse(JSON.stringify(state.shops));
  roads = action.payload.roads;
  shops = action.payload.shops;
  return {
    ...state,
    roads,
    shops
  }
}

REDUX_FUNCTION['NAVIGATE_MAP'] = (state, action) => { 
  let navPoints = JSON.parse(JSON.stringify(state.navPoints));
  navPoints = action.payload.path
  return {
    ...state,
    navPoints
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

REDUX_FUNCTION['REMOVE_ROAD'] = (state, action) => { 
  let roads = JSON.parse(JSON.stringify(state.roads));
  roads.pop()
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

REDUX_FUNCTION['REMOVE_SHOP'] = (state, action) => { 
  let shops = JSON.parse(JSON.stringify(state.roads));
  shops.pop()
  return {
    ...state,
    shops
  }
}

REDUX_FUNCTION['ADD_NAVIGATION'] = (state, action) => { 
  let navigation = JSON.parse(JSON.stringify(state.navigation));
  navigation.x1 = action.payload.x1;
  navigation.y1 = action.payload.y1;
  navigation.x2 = action.payload.x2;
  navigation.y2 = action.payload.y2;
  return {
    ...state,
    navigation
  }
}

REDUX_FUNCTION['REMOVE_NAVIGATION'] = (state, action) => { 
  let navigation = JSON.parse(JSON.stringify(state.navigation));
  navigation = {}
  return {
    ...state,
    navigation
  }
}


export {
  REDUX_FUNCTION
}