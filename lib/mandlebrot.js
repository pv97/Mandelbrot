const Graph = require("./graph");
const Rectangle = require("./rectangle");
const Util = require("./util");

document.addEventListener("DOMContentLoaded", function(){
  let canvas = document.getElementById("canvas");
  let mask = document.getElementById("mask");
  let inputA = document.getElementById("inputA");
  let inputB = document.getElementById("inputB");
  let reset = document.getElementById("reset");
  let explanation = document.getElementById("explanation");
  let explanationText = document.getElementById("explanation-text");
  let width = window.innerWidth;
  let height = window.innerHeight;
  let maxIter = 40;
  let xrange = [-2,1];
  let yrange = [-1,1];
  let z0 = [0,0];
  let vertex1;
  let vertex2;
  let drag = false;
  canvas.width = width;
  canvas.height = height;
  mask.width = width;
  mask.height = height;

  const ctx = canvas.getContext("2d");
  const ctxMask = mask.getContext("2d");
  let graph = new Graph(ctx, width, height)
  let rectangle = new Rectangle(ctxMask, width, height)

  graph.render(xrange,yrange,z0,maxIter);

  inputA.addEventListener("change",(e)=>{
    z0[0] = e.currentTarget.value;
    graph.render(xrange,yrange,z0,maxIter);
  })

  inputB.addEventListener("change",(e)=>{
    z0[1] = e.currentTarget.value;
    graph.render(xrange,yrange,z0,maxIter);
  })

  reset.addEventListener("click",(e)=>{
    maxIter = 40;
    xrange = [-2,1];
    yrange = [-1,1];
    z0 = [0,0];
    inputA.value = 0;
    inputB.value = 0;
    graph.render(xrange,yrange,z0,maxIter);
  })

  explanation.addEventListener("click",(e)=>{
    if (explanationText.className==="invisible"){
      explanationText.className = "visible"
    } else {
      explanationText.className = "invisible"
    }
  })

  mask.addEventListener("mousedown",(e)=>{
    vertex1 = [e.clientX,e.clientY];
    drag = true;
  })

  mask.addEventListener("mousemove",(e)=>{
    if(drag){
      vertex2 = [e.clientX,e.clientY];
      rectangle.render(vertex1,vertex2);
    }
  })

  mask.addEventListener("mouseup",(e)=>{
    drag = false;
    rectangle.clear();
    vertex2 = [e.clientX,e.clientY];
    xrange = Util.newXRange(vertex1,vertex2,xrange,width);
    yrange = Util.newYRange(vertex1,vertex2,yrange,height);
    maxIter+=10;
    console.log(maxIter);
    graph.render(xrange,yrange,z0,maxIter);
  })


});
