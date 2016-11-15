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
