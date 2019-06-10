export const pointTracer = (map,x,y,thickness,fill,scale) => {
  let canvas = document.getElementById(map);
  let ctx = canvas.getContext("2d");
  var snappedX = ((x - (x % scale)) + (x + (scale - (x % scale))))/2;
  var snappedY = ((y - (y % scale)) + (y + (scale - (y % scale))))/2;
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.arc(snappedX , snappedY , thickness / 2 , 0 , 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

export const lineTracer = (map,x1,y1,x2,y2,thickness,fill,round,scale) => {
  let canvas = document.getElementById(map);
  let ctx = canvas.getContext("2d");
  var snappedX1 = ((x1 - (x1 % scale)) + (x1 + (scale - (x1 % scale))))/2;
  var snappedY1 = ((y1 - (y1 % scale)) + (y1 + (scale - (y1 % scale))))/2;
  var snappedX2 = ((x2 - (x2 % scale)) + (x2 + (scale - (x2 % scale))))/2;
  var snappedY2 = ((y2 - (y2 % scale)) + (y2 + (scale - (y2 % scale))))/2;
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.beginPath();
  ctx.moveTo(snappedX1,snappedY1);
  ctx.lineTo(snappedX2,snappedY2);
  ctx.lineWidth = thickness;
  ctx.lineCap = round;
  ctx.strokeStyle = fill;
  ctx.stroke();
  ctx.closePath()
}

export const removeTracer = (map) => {
  let canvas = document.getElementById(map);
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
}

export const drawRoads = (map,roads,thickness,fill,round,scale) => {
  var canvas = document.getElementById(map);
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  for(var road of roads){
    ctx.beginPath();
    ctx.moveTo((road.x1*scale)+(scale/2),(road.y1*scale)+(scale/2));
    ctx.lineTo((road.x2*scale)+(scale/2),(road.y2*scale)+(scale/2));
    ctx.lineWidth = thickness;
    ctx.lineCap = round;
    ctx.strokeStyle = fill;
    ctx.stroke();
    ctx.closePath()
  }
}

export const drawShops = (map,shops,thickness,fill,scale) => {
  var canvas = document.getElementById(map);
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  for(var shop of shops)
  {
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.arc((shop.x*scale)+(scale/2), (shop.y*scale)+(scale/2), thickness/2 , 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }
}

export const drawNavPoints = (map,navigations,thickness,fill,scale) => {
  var canvas = document.getElementById(map);
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.arc((navigations.x1*scale)+(scale/2), (navigations.y1*scale)+(scale/2), thickness/2 , 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc((navigations.x2*scale)+(scale/2), (navigations.y2*scale)+(scale/2), thickness/2 , 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

export const drawNavigation = (map,navPoints,thickness,fill,round,scale) => {
  console.log("draw",navPoints)
  var canvas = document.getElementById(map);
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  for(var i=0 ;i < navPoints.length - 1 ;i++){
    console.log(navPoints[i].x,navPoints[i+1].x)
    ctx.beginPath();
    ctx.moveTo(((navPoints[i].x)*scale)+(scale/2),((navPoints[i].y)*scale)+(scale/2));
    ctx.lineTo(((navPoints[i+1].x)*scale)+(scale/2),((navPoints[i+1].y)*scale)+(scale/2));
    ctx.lineWidth = thickness;
    ctx.lineCap = round;
    ctx.strokeStyle = fill;
    ctx.stroke();
    ctx.closePath()
  }
}

export const getCartesianCoords = (point,scale) => {
  return Math.floor(point/scale);
}