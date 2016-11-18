const Complex = require("./complex");
const ColorScheme = require("./color_scheme");

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
