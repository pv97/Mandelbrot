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
      return 122+122*Math.sin(val/120);
    },
    green(val){
      return 122+122*Math.cos(val/182);
    },
    blue(val){
      return val;
    }
  },
  3:{
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
  4:{
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
  5:{
    red(val){
      return 122+122*Math.sin(val/40);
    },
    green(val){
      return 122+122*Math.cos(val/40);
    },
    blue(val){
      return 122+122*Math.sin(val/40);
    }
  },
  6:{
    red(val){
      return val;
    },
    green(val){
      return 122+122*Math.cos(val/20)*Math.sin(val/40);
    },
    blue(val){
      return 122+122*Math.sin(val/40)*Math.cos(-val/20);
    }
  },

};

module.exports = ColorScheme;
