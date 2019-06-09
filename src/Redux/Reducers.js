import { combineReducers } from 'redux'
import { REDUX_FUNCTION } from './ReducersMethods'

const initialStore = {
  height: 0,
  width: 0,
  offset: 0,
  scale: 20,
  asset : 'road',
  roads: [],
  shops: []
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