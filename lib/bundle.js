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
	const Rectangle = __webpack_require__(3);
	const Util = __webpack_require__(4);
	
	document.addEventListener("DOMContentLoaded", function(){
	  let canvas = document.getElementById("canvas");
	  let mask = document.getElementById("mask");
	  let inputA = document.getElementById("inputA");
	  let inputB = document.getElementById("inputB");
	  let reset = document.getElementById("reset");
	  let explanation = document.getElementById("explanation");
	  let explanationText = document.getElementById("explanation-text");
	  let colorSelector = document.getElementById("color-selector");
	  let precisionSelector = document.getElementById("precision-selector");
	
	  let width = window.innerWidth;
	  let height = window.innerHeight;
	  let maxIter = 40;
	  let xrange = [-2,1];
	  let yrange = [-1,1];
	  let z0 = [0,0];
	  let vertex1;
	  let vertex2;
	  let drag = false;
	  let color = "1";
	  let precision = "1";
	
	  canvas.width = width;
	  canvas.height = height;
	  mask.width = width;
	  mask.height = height;
	
	  const ctx = canvas.getContext("2d");
	  const ctxMask = mask.getContext("2d");
	  let graph = new Graph(ctx, width, height)
	  let rectangle = new Rectangle(ctxMask, width, height)
	
	  graph.render(xrange,yrange,z0,maxIter,color,precision);
	
	  inputA.addEventListener("change",(e)=>{
	    z0[0] = e.currentTarget.value;
	    graph.render(xrange,yrange,z0,maxIter,color,precision);
	  })
	
	  inputB.addEventListener("change",(e)=>{
	    z0[1] = e.currentTarget.value;
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
	    xrange = [-2,1];
	    yrange = [-1,1];
	    z0 = [0,0];
	    inputA.value = 0;
	    inputB.value = 0;
	    graph.render(xrange,yrange,z0,maxIter,color,precision);
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
	    graph.render(xrange,yrange,z0,maxIter,color,precision);
	  })
	
	
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Complex = __webpack_require__(2);
	const ColorScheme = __webpack_require__(5);
	
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
/***/ function(module, exports, __webpack_require__) {

	const Complex = __webpack_require__(2);
	const Util = __webpack_require__(4);
	
	class Rectangle {
	  constructor(ctxMask, width, height) {
	    this.ctx = ctxMask;
	    this.width = width;
	    this.height = height;
	  }
	
	  render(vertex1,vertex2){
	    let topLeft = Util.getTopLeftCorner(vertex1,vertex2);
	    let lengths = Util.getSideLength(vertex1,vertex2);
	    let x0 = topLeft[0]
	    let y0 = topLeft[1]
	    let lengthx = lengths[0]
	    let lengthy = lengths[1]
	    this.ctx.clearRect(0, 0, this.width, this.height);
	    this.ctx.strokeRect(x0,y0,lengthx,lengthy);
	  }
	
	  clear(){
	    this.ctx.clearRect(0, 0, this.width, this.height);
	  }
	
	}
	
	module.exports = Rectangle;


/***/ },
/* 4 */
/***/ function(module, exports) {

	const Util = {
	  newXRange (vertex1,vertex2,xrange,width) {
	    let oldDif = xrange[1]-xrange[0];
	    let xmin = xrange[0] + oldDif*(Math.min(vertex1[0],vertex2[0]))/width;
	    let xmax = xrange[0] + oldDif*(Math.max(vertex1[0],vertex2[0]))/width;
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
	  }
	};
	
	module.exports = Util;


/***/ },
/* 5 */
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map