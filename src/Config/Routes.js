const BASE_URL = "http://192.168.31.99:5000";

const GET_ALL_MAPS = BASE_URL + "/maps";
const ADD_MAP = BASE_URL + "/add-map";
const DELETE_MAP = BASE_URL + "/delete-map";
const GET_MAP_ASSETS = (id) => BASE_URL + `/get-map-assets/${id}`;
const ADD_MAP_ROAD = BASE_URL + "/add-road";
const DELETE_MAP_ROAD = BASE_URL + "/delete-road";
const ADD_MAP_SHOP = BASE_URL + "/add-shop";
const DELETE_MAP_SHOP = BASE_URL + "/delete-shop";
const NAVIGATE_MAP = BASE_URL + "/navigate";



export {
  GET_ALL_MAPS,
  ADD_MAP,
  DELETE_MAP,
  GET_MAP_ASSETS,
  ADD_MAP_ROAD,
  DELETE_MAP_ROAD,
  DELETE_MAP_SHOP,
  ADD_MAP_SHOP,
  NAVIGATE_MAP
}