const Graph = require("./graph");
const Util = require("./util");

document.addEventListener("DOMContentLoaded", function(){
  var canvas = document.getElementById("canvas");
  var width = window.innerWidth;
  var height = window.innerHeight;
  var maxIter = 4-m 0;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  let xrange = [-2,1];
  let yrange = [-1,1];
  let z0 = [0,0];

  var graph = new Graph(ctx, width, height)
  graph.render(xrange,yrange,z0,maxIter);

  let vertex1;
  let vertex2;

  canvas.addEventListener("mousedown",(e)=>{
    vertex1 = [e.clientX,e.clientY];
  })

  canvas.addEventListener("mouseup",(e)=>{
    vertex2 = [e.clientX,e.clientY];
    xrange = Util.newXRange(vertex1,vertex2,xrange,width);
    yrange = Util.newYRange(vertex1,vertex2,yrange,height);
    maxIter*=2;
    console.log(maxIter);
    graph.render(xrange,yrange,z0,maxIter);
  })

});
