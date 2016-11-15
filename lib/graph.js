const Complex = require("./complex");

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
