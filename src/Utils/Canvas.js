export const pointTracer = (map,x,y,thickness,fill) => {
  let canvas = document.getElementById(map);
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.arc(x , y , thickness / 2 , 0 , 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

export const lineTracer = (map,x1,y1,x2,y2,thickness,fill,round) => {
  let canvas = document.getElementById(map);
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
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

export const drawRoads = (map,roads,thickness,fill,round) => {
  console.log("DrawRoadsFunction")
  var canvas = document.getElementById(map);
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  for(var road of roads){
    ctx.beginPath();
    ctx.moveTo(road.x1,road.y1);
    ctx.lineTo(road.x2,road.y2);
    ctx.lineWidth = thickness;
    ctx.lineCap = round;
    ctx.strokeStyle = fill;
    ctx.stroke();
    ctx.closePath()
  }
}

export const drawShops = (map,shops,thickness,fill) => {
  var canvas = document.getElementById(map);
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  for(var shop of shops)
  {
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.arc(shop.x, shop.y, thickness/2 , 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }
}