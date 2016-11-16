/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Graph = __webpack_require__(1);
	const JGraph = __webpack_require__(6);
	const Rectangle = __webpack_require__(4);
	const Util = __webpack_require__(5);
	
	document.addEventListener("DOMContentLoaded", function(){
	  let canvas = document.getElementById("canvas");
	  let Jcanvas = document.getElementById("Jcanvas");
	  let mask = document.getElementById("mask");
	  let Jmask = document.getElementById("Jmask");
	
	  //Mandlebrot Settings
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
	
	  //Mandlebrot Set Variables
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
	
	  //Mandlebrot Settings
	  ZinputA.addEventListener("change",(e)=>{
	    z0[0] = parseFloat(e.currentTarget.value);
	    graph.render(xrange,yrange,z0,maxIter,color,precision);
	  })
	
	  ZinputB.addEventListener("change",(e)=>{
	    z0[1] = parseFloat(e.currentTarget.value);
	    graph.render(xrange,yrange,z0,maxIter,color,precision);
	  })
	
	  colorSelector.addEventListener("change",(e)=>{
	    color= e.currentTarget.value;
	    graph.render(xrange,yrange,z0,maxIter,color,precision);
	  })
	
	  precisionSelector.addEventListener("change",(e)=>{
	    precision= e.currentTarget.value;
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
	
	  //Mandlebrot Overlay
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
	    console.log(vertex1);
	    console.log(vertex2);
	    if(Util.isClick(vertex1,vertex2)){
	      z0 = Util.getC(vertex1,xrange,yrange,width,height);
	      ZinputA.value = c[0]
	      ZinputB.value = c[1]
	      graph.render(xrange,yrange,z0,maxIter,color,precision);
	    } else {
	      Jxrange = Util.newXRange(vertex1,vertex2,Jxrange,Jwidth,height,ratio,keepRatio);
	      Jyrange = Util.newYRange(vertex1,vertex2,Jyrange,height);
	      JmaxIter+=5;
	      Jgraph.render(Jxrange,Jyrange,c,JmaxIter,color,precision);
	    }
	  })
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Complex = __webpack_require__(2);
	const ColorScheme = __webpack_require__(3);
	
	class Graph {
	  constructor(ctx, width, height) {
	    this.ctx = ctx;
	    this.width = width;
	    this.height = height;
	    this.imagedata = ctx.createImageData(width, height)
	  }
	
	  render(xrange,yrange,z0,maxIter,color,precision){
	    let xmin = xrange[0];
	    let xmax = xrange[1];
	    let ymin = yrange[0];
	    let ymax = yrange[1];
	    let xdif = xmax-xmin;
	    let ydif = ymax-ymin;
	    let p = parseInt(precision)
	    let a;
	    let b;
	    let n;
	    let val;
	    let pixelindex = 0;
	
	    for (var y=0; y<this.height; y++) {
	      b = ymin + ydif*(y/this.height)
	
	      for (var x=0; x<this.width; x+=p) {
	        a = xmin + xdif*(x/this.width)
	
	        n = this.iterate([a,b],z0,maxIter);
	        val = 255*n/maxIter;
	
	        for (var z = 0; z < p; z++) {
	          this.imagedata.data[pixelindex++] = ColorScheme[color].red(val);   // Red
	          this.imagedata.data[pixelindex++] = ColorScheme[color].green(val);  // Green
	          this.imagedata.data[pixelindex++] = ColorScheme[color].blue(val);  // Blue
	          this.imagedata.data[pixelindex++] = 255;   // Alpha
	        }
	      }
	    }
	
	    this.ctx.putImageData(this.imagedata, 0, 0);
	  }
	
	  iterate(c,z0,maxIter){
	    let n = 0;
	    let z = z0
	    let magnitude = 0
	
	    while (n<maxIter) {
	      z = Complex.add(Complex.square(z),c)
	      magnitude = Complex.abs(z);
	
	      if (magnitude > 4) {
	        return n;
	      }
	
	      n++;
	    }
	    return maxIter
	  }
	}
	
	module.exports = Graph;


/***/ },
/* 2 */
/***/ function(module, exports) {

	const Complex = {
	  abs(z){
	    let a = z[0];
	    let b = z[1];
	    return a*a + b*b;
	  },
	
	  square(z){
	    let a = z[0];
	    let b = z[1];
	    return [a*a - b*b, 2*a*b];
	  },
	
	  add(z,c){
	    return [z[0]+c[0],z[1]+c[1]];
	  }
	};
	
	module.exports = Complex;


/***/ },
/* 3 */
/***/ function(module, exports) {

	const ColorScheme = {
	  1:{
	    red(val){
	      return val;
	    },
	    green(val){
	      return val;
	    },
	    blue(val){
	      return val;
	    }
	  },
	  2:{
	    red(val){
	      return 122+122*Math.sin(val/40);
	    },
	    green(val){
	      return 122+122*Math.cos(val/40);
	    },
	    blue(val){
	      return 255-Math.log(val);
	    }
	  },
	  3:{
	    red(val){
	      return 255-Math.log(val);
	    },
	    green(val){
	      return 122+122*Math.sin(val/60);
	    },
	    blue(val){
	      return 122+122*Math.cos(val/20);
	    }
	  },
	  4:{
	    red(val){
	      return 122+122*Math.sin(val/129);
	    },
	    green(val){
	      return 122+122*Math.cos(val/108);
	    },
	    blue(val){
	      return 122+122*Math.cos(val/80);
	    }
	  },
	  5:{
	    red(val){
	      return 122-122*(Math.cos(-val/150))/(Math.sin(val/140)+1);
	    },
	    green(val){
	      return 122-122*Math.cos(val/30)*Math.cos(val/280);
	    },
	    blue(val){
	      return 122-122*(Math.sin(val/40))/(1+Math.cos(-val/220));
	    }
	  },
	
	};
	
	module.exports = ColorScheme;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Complex = __webpack_require__(2);
	const Util = __webpack_require__(5);
	
	class Rectangle {
	  constructor(ctxMask, width, height) {
	    this.ctx = ctxMask;
	    this.width = width;
	    this.height = height;
	  }
	
	  render(vertex1,vertex2,ratio,keepRatio){
	    let topLeft = Util.getTopLeftCorner(vertex1,vertex2);
	    let lengths = Util.getSideLength(vertex1,vertex2);
	    let x0 = topLeft[0]
	    let y0 = topLeft[1]
	    let lengthx;
	    let lengthy = lengths[1]
	
	    if(keepRatio){
	      lengthx = lengthy*ratio
	      if(vertex2[0]-vertex1[0]<0){
	        x0 = vertex1[0]-lengthx
	      }
	    } else {
	      lengthx = lengths[0]
	    }
	
	    this.ctx.clearRect(0, 0, this.width, this.height);
	    this.ctx.strokeRect(x0,y0,lengthx,lengthy);
	  }
	
	  clear(){
	    this.ctx.clearRect(0, 0, this.width, this.height);
	  }
	
	}
	
	module.exports = Rectangle;


/***/ },
/* 5 */
/***/ function(module, exports) {

	const Util = {
	  newXRange (vertex1,vertex2,xrange,width,height,ratio,keepRatio) {
	    let oldDif = xrange[1]-xrange[0];
	    let xmin = xrange[0] + oldDif*(Math.min(vertex1[0],vertex2[0]))/width;
	    let xmax = xrange[0] + oldDif*(Math.max(vertex1[0],vertex2[0]))/width;
	    if(keepRatio){
	      if(vertex2[0] - vertex1[0] < 0){
	        xmin = xmax - oldDif*Math.abs(vertex1[1]-vertex2[1])/height;
	      } else {
	        xmax = xmin + oldDif*Math.abs(vertex1[1]-vertex2[1])/height;
	      }
	    }
	    return [xmin,xmax];
	  },
	  newYRange (vertex1,vertex2,yrange,height) {
	    let oldDif = yrange[1]-yrange[0];
	    let ymin = yrange[0] + oldDif*(Math.min(vertex1[1],vertex2[1]))/height;
	    let ymax = yrange[0] + oldDif*(Math.max(vertex1[1],vertex2[1]))/height;
	    return [ymin,ymax];
	  },
	  getTopLeftCorner(vertex1,vertex2){
	    let x = Math.min(vertex1[0],vertex2[0]);
	    let y = Math.min(vertex1[1],vertex2[1]);
	    return [x,y]
	  },
	  getSideLength(vertex1,vertex2){
	    let x = Math.abs(vertex1[0]-vertex2[0]);
	    let y = Math.abs(vertex1[1]-vertex2[1]);
	    return [x,y]
	  },
	  isClick(vertex1,vertex2){
	    xdif = Math.abs(vertex1[0]-vertex2[0])
	    ydif = Math.abs(vertex1[1]-vertex2[1])
	    if(xdif+ydif < 5){
	      return true
	    } else {
	      return false
	    }
	  },
	  getC(vertex1,xrange,yrange,width,height){
	    let oldDifx = xrange[1]-xrange[0];
	    let oldDify = yrange[1]-yrange[0];
	    let x = xrange[0] + oldDifx*vertex1[0]/width;
	    let y = yrange[0] + oldDify*vertex1[1]/height;
	    return [x,y]
	  }
	};
	
	module.exports = Util;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Complex = __webpack_require__(2);
	const ColorScheme = __webpack_require__(3);
	
	class JGraph {
	  constructor(ctx, width, height) {
	    this.ctx = ctx;
	    this.width = width;
	    this.height = height;
	    this.imagedata = ctx.createImageData(width, height)
	  }
	
	  render(xrange,yrange,c,maxIter,color,precision){
	    let xmin = xrange[0];
	    let xmax = xrange[1];
	    let ymin = yrange[0];
	    let ymax = yrange[1];
	    let xdif = xmax-xmin;
	    let ydif = ymax-ymin;
	    let p = parseInt(precision)
	    let a;
	    let b;
	    let n;
	    let val;
	    let pixelindex = 0;
	
	    for (var y=0; y<this.height; y++) {
	      b = ymin + ydif*(y/this.height)
	
	      for (var x=0; x<this.width; x+=p) {
	        a = xmin + xdif*(x/this.width)
	
	        n = this.iterate(c,[a,b],maxIter);
	        val = 255*n/maxIter;
	
	        for (var z = 0; z < p; z++) {
	          this.imagedata.data[pixelindex++] = ColorScheme[color].red(val);   // Red
	          this.imagedata.data[pixelindex++] = ColorScheme[color].green(val);  // Green
	          this.imagedata.data[pixelindex++] = ColorScheme[color].blue(val);  // Blue
	          this.imagedata.data[pixelindex++] = 255;   // Alpha
	        }
	      }
	    }
	
	    this.ctx.putImageData(this.imagedata, 0, 0);
	  }
	
	  iterate(c,z0,maxIter){
	    let n = 0;
	    let z = z0
	    let magnitude = 0
	
	    while (n<maxIter) {
	      z = Complex.add(Complex.square(z),c)
	      magnitude = Complex.abs(z);
	
	      if (magnitude > 4) {
	        return n;
	      }
	
	      n++;
	    }
	    return maxIter
	  }
	}
	
	module.exports = JGraph;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map