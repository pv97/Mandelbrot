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
