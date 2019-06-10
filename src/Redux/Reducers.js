import { combineReducers } from 'redux'
import { REDUX_FUNCTION } from './ReducersMethods'

const initialStore = {
  height: 0,
  width: 0,
  offset: 0,
  scale: 20,
  asset : 'road',
  roads: [],
  shops: [],
  navPoints: [],
  navigation: {
    x1: null,
    x2: null,
    y1: null,
    y2: null
  }
};

const globalState = (state = initialStore, action) => {
  if (REDUX_FUNCTION[action.type])
    return REDUX_FUNCTION[action.type](state, action);
  else
    return state

};


const rootReducer = combineReducers({
  globalState,
})

export default rootReducer;