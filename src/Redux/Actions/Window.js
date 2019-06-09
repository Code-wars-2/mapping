export const resizeWindow = (data) => {
  let payload = data;
  return {
    type: "RESIZE_WINDOW",
    payload
  }
}