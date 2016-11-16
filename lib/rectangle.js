const Complex = require("./complex");
const Util = require("./util");

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
