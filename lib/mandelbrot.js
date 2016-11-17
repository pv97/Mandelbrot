const Graph = require("./graph");
const JGraph = require("./j_graph");
const Rectangle = require("./rectangle");
const Util = require("./util");

let resize = undefined;

document.addEventListener("DOMContentLoaded", MandelbrotJulia);

function optimalResize(){
  if(resize){
    clearTimeout(resize)
  }
  resize = setTimeout(function(){
    MandelbrotJulia()
  },2000)
}

window.addEventListener("resize", optimalResize);

function MandelbrotJulia(){
  let canvas = document.getElementById("canvas");
  let Jcanvas = document.getElementById("Jcanvas");
  let mask = document.getElementById("mask");
  let Jmask = document.getElementById("Jmask");

  //Mandelbrot Settings
  let ZinputA = document.getElementById("ZinputA");
  let ZinputB = document.getElementById("ZinputB");
  let reset = document.getElementById("reset");
  let explanation = document.getElementById("explanation");
  let explanationText = document.getElementById("explanation-text");
  let colorSelector = document.getElementById("color-selector");
  let precisionSelector = document.getElementById("precision-selector");
  let ratioCheckbox = document.getElementById("ratio-checkbox");

  //Julia Settings
  let CinputA = document.getElementById("CinputA");
  let CinputB = document.getElementById("CinputB");
  let Jreset = document.getElementById("Jreset");

  //Global Variables
  let z0 = [0,0];
  let c = [0,0];
  let vertex1;
  let vertex2;
  let drag = false;
  let color = "1";
  let precision = "1";
  let keepRatio = true;

  //Mandelbrot Set Variables
  let width = window.innerWidth*2/3;
  let height = window.innerHeight;
  let ratio = width/height;
  let xrange = [-2,0.5];
  let yrange = [-1,1];
  let maxIter = 40;
  canvas.width = width;
  canvas.height = height;
  mask.width = width;
  mask.height = height;
  const ctx = canvas.getContext("2d");
  const ctxMask = mask.getContext("2d");
  let graph = new Graph(ctx, width, height)
  let rectangle = new Rectangle(ctxMask, width, height)

  //Julia Set Variables
  let Jwidth = window.innerWidth*1/3;
  let Jratio = Jwidth/height;
  let Jxrange = [-2,2];
  let Jyrange = [-2,2];
  let JmaxIter = 40;
  Jcanvas.width = Jwidth;
  Jcanvas.height = height;
  Jmask.width = Jwidth;
  Jmask.height = height;
  const Jctx = Jcanvas.getContext("2d");
  const JctxMask = Jmask.getContext("2d");
  let Jgraph = new JGraph(Jctx, Jwidth, height)
  let Jrectangle = new Rectangle(JctxMask, Jwidth, height)

  graph.render(xrange,yrange,z0,maxIter,color,precision);
  Jgraph.render(Jxrange,Jyrange,c,JmaxIter,color,precision);


  //Settings
  colorSelector.addEventListener("change",(e)=>{
    color= e.currentTarget.value;
    graph.render(xrange,yrange,z0,maxIter,color,precision);
    Jgraph.render(Jxrange,Jyrange,c,JmaxIter,color,precision);
  })

  precisionSelector.addEventListener("change",(e)=>{
    precision= e.currentTarget.value;
    graph.render(xrange,yrange,z0,maxIter,color,precision);
    Jgraph.render(Jxrange,Jyrange,c,JmaxIter,color,precision);
  })

  explanation.addEventListener("click",(e)=>{
    if (explanationText.className==="invisible"){
      explanationText.className = "visible"
    } else {
      explanationText.className = "invisible"
    }
  })

  ratioCheckbox.addEventListener("change",(e)=>{
    keepRatio = keepRatio? false : true;
  })

  //Mandelbrot Settings
  ZinputA.addEventListener("change",(e)=>{
    z0[0] = parseFloat(e.currentTarget.value);
    graph.render(xrange,yrange,z0,maxIter,color,precision);
  })

  ZinputB.addEventListener("change",(e)=>{
    z0[1] = parseFloat(e.currentTarget.value);
    graph.render(xrange,yrange,z0,maxIter,color,precision);
  })

  reset.addEventListener("click",(e)=>{
    maxIter = 40;
    xrange = [-2,0.5];
    yrange = [-1,1];
    z0 = [0,0];
    ZinputA.value = 0;
    ZinputB.value = 0;
    graph.render(xrange,yrange,z0,maxIter,color,precision);
  })

  //Julia Settings
  CinputA.addEventListener("change",(e)=>{
    c[0] = parseFloat(e.currentTarget.value);
    console.log(c);
    Jgraph.render(Jxrange,Jyrange,c,JmaxIter,color,precision);
  })

  CinputB.addEventListener("change",(e)=>{
    c[1] = parseFloat(e.currentTarget.value);
    Jgraph.render(Jxrange,Jyrange,c,JmaxIter,color,precision);
  })

  Jreset.addEventListener("click",(e)=>{
    maxIter = 40;
    Jxrange = [-2,2];
    Jyrange = [-2,2];
    c = [0,0];
    CinputA.value = 0;
    CinputB.value = 0;
    Jgraph.render(Jxrange,Jyrange,c,JmaxIter,color,precision);
  })

  //Mandelbrot Overlay
  mask.addEventListener("mousedown",(e)=>{
    vertex1 = [e.clientX,e.clientY];
    drag = true;
  })

  mask.addEventListener("mousemove",(e)=>{
    if(drag){
      vertex2 = [e.clientX,e.clientY];
      rectangle.render(vertex1,vertex2,ratio,keepRatio);
    }
  })

  mask.addEventListener("mouseup",(e)=>{
    drag = false;
    rectangle.clear();
    vertex2 = [e.clientX,e.clientY];
    if(Util.isClick(vertex1,vertex2)){
      c = Util.getC(vertex1,xrange,yrange,width,height);
      CinputA.value = c[0]
      CinputB.value = c[1]
      Jgraph.render(Jxrange,Jyrange,c,JmaxIter,color,precision);
    } else {
      xrange = Util.newXRange(vertex1,vertex2,xrange,width,height,ratio,keepRatio);
      yrange = Util.newYRange(vertex1,vertex2,yrange,height);
      maxIter+=5;
      graph.render(xrange,yrange,z0,maxIter,color,precision);
    }
  })

  //Julia Overlay
  Jmask.addEventListener("mousedown",(e)=>{
    vertex1 = [e.clientX-width,e.clientY];
    drag = true;
  })

  Jmask.addEventListener("mousemove",(e)=>{
    if(drag){
      vertex2 = [e.clientX-width,e.clientY];
      Jrectangle.render(vertex1,vertex2,ratio,keepRatio);
    }
  })

  Jmask.addEventListener("mouseup",(e)=>{
    drag = false;
    Jrectangle.clear();
    vertex2 = [e.clientX-width,e.clientY];
    if(Util.isClick(vertex1,vertex2)){
      z0 = Util.getZ(vertex1,Jxrange,Jyrange,Jwidth,height);
      ZinputA.value = z0[0]
      ZinputB.value = z0[1]
      graph.render(xrange,yrange,z0,maxIter,color,precision);
    } else {
      Jxrange = Util.newXRange(vertex1,vertex2,Jxrange,Jwidth,height,ratio,keepRatio);
      Jyrange = Util.newYRange(vertex1,vertex2,Jyrange,height);
      JmaxIter+=5;
      Jgraph.render(Jxrange,Jyrange,c,JmaxIter,color,precision);
    }
  })
}
