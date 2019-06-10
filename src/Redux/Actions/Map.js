export const changeAsset = (data) => {
  let payload = data
  return {
    type: "CHANGE_ASSET",
    payload
  }
}

export const addRoad = (data) => {
  let payload = data
  return {
    type: "ADD_ROAD",
    payload
  }
}

export const removeRoad = () => {
  return {
    type: "REMOVE_ROAD",
  }
}

export const addShop = (data) => {
  let payload = data
  return {
    type: "ADD_SHOP",
    payload
  }
}

export const removeShop = () => {
  return {
    type: "REMOVE_SHOP",
  }
}