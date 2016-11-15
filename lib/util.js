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
