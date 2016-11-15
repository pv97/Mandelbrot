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
	const Util = __webpack_require__(4);
	
	document.addEventListener("DOMContentLoaded", function(){
	  var canvas = document.getElementById("canvas");
	  var width = window.innerWidth;
	  var height = window.innerHeight;
	  var maxIter = 40;
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
	    graph.render(xrange,yrange,z0,maxIter);
	  })
	
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Complex = __webpack_require__(2);
	
	class Graph {
	  constructor(ctx, width, height) {
	    this.ctx = ctx;
	    this.width = width;
	    this.height = height;
	    this.imagedata = ctx.createImageData(width, height)
	  }
	
	  render(xrange,yrange,z0,maxIter){
	    let xmin = xrange[0];
	    let xmax = xrange[1];
	    let ymin = yrange[0];
	    let ymax = yrange[1];
	    let xdif = xmax-xmin;
	    let ydif = ymax-ymin;
	
	    var pixelindex = 0;
	    for (var y=0; y<this.height; y++) {
	      for (var x=0; x<this.width; x++) {
	        let a = xmin + xdif*(x/this.width)
	        let b = ymin + ydif*(y/this.height)
	        let c = [a, b]
	
	        let n = this.iterate(c,z0,maxIter);
	        let val = 255*n/maxIter;
	
	        var red = val;
	        var green = val;
	        var blue = val;
	
	        this.imagedata.data[pixelindex++] = red;     // Red
	        this.imagedata.data[pixelindex++] = green; // Green
	        this.imagedata.data[pixelindex++] = blue;  // Blue
	        this.imagedata.data[pixelindex++] = 255;   // Alpha
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
	
	      if (magnitude > 2) {
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
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	const Util = {
	  newXRange (vertex1,vertex2,xrange,width) {
	    oldDif = xrange[1]-xrange[0];
	    xmin = xrange[0] + oldDif*(Math.min(vertex1[0],vertex2[0]))/width;
	    xmax = xrange[0] + oldDif*(Math.max(vertex1[0],vertex2[0]))/width;
	    return [xmin,xmax]
	  },
	  newYRange (vertex1,vertex2,yrange,height) {
	    oldDif = yrange[1]-yrange[0];
	    ymin = yrange[0] + oldDif*(Math.min(vertex1[1],vertex2[1]))/height;
	    ymax = yrange[0] + oldDif*(Math.max(vertex1[1],vertex2[1]))/height;
	    return [ymin,ymax]
	  }
	};
	
	module.exports = Util;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map