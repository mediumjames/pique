
function getPeaks() {
  var vals;
  var hind = [];
  var lind = [];
  /////CHECK PARAMETERS/////
  //is there a vals param?//
  if (arguments.length == 1) {
    vals = arguments[0];
    //set default indexer//
    for (i=0; i < vals.length; i++) {
        hind.push(i);
        lind.push(i);
      }
    }
  //is there also an indexer?//
  else if (arguments.length == 2) {
    vals = arguments[0];
    hind = arguments[1].h;
    lind = arguments[1].l;
    //is the indexer an array?//
    if (!(hind.constructor === Array) || !(lind.constructor === Array)) {
        console.log("getPeaks: Incorrect argument type, arrays only");
      return -2;
    }
  }
  //if not then params invalid//
  else {
      console.log("getPeaks: Incorrect number of arguments, pass one array (optional one indexer)");
    return -1;
  }
  //is the vals param an array?//
  if (!(vals.constructor === Array)) {
  console.log("getPeaks: Incorrect argument type, arrays only");
    return -2;
  }

/////MAIN LOOP/////
  var highs = [];
  var lows = [];
  /////CHECK IF HIGH/////
    for (var i=2; i < hind.length; i++) {
      if (vals[hind[i]] > vals[hind[i-1]]
//        && vals[hind[i]] > vals[hind[i-2]]
//        && vals[hind[i-1]] > vals[hind[i-2]]
        ) {
        if (i+1 < vals.length) {
          if (vals[hind[i]] >= vals[hind[i+1]]) {
//            console.log(`HIGH: ${vals[hind[i]]}`);
            highs.push(hind[i]);
          }
        }
      }
    }
    /////CHECK IF LOW/////
    for (var i=2; i < lind.length; i++) {
      if (vals[lind[i]] < vals[lind[i-1]]
//          && vals[lind[i]] < vals[lind[i-2]]
//          && vals[lind[i-1]] < vals[lind[i-2]]
        ) {
        if (i+1 < vals.length) {
          if (vals[lind[i]] <= vals[lind[i+1]]) {
//            console.log(`LOW: ${vals[lind[i]]}`);
            lows.push(lind[i]);
          }
        }
      }
    }

    var mag = {h: highs, l: lows, hlen: highs.length, llen: lows.length};
    return mag;
}

function plotPeaks(y, obj, mode, mag, hue) {
  var x;
  var len;
  colorMode(HSB, 100)
  if (mode == 'h') {
    x = obj.h;
    len = obj.hlen;
  }
  if (mode == 'l') {
    x = obj.l;
    len = obj.llen;
  }
  for (i=0; i < len; i++) {
    if (mode == 'h') {
      fill(hue,100,100);
      stroke(hue,100,100);
    } else if (mode == 'l') {
      fill(hue,50,100);
      stroke(hue,50,100);
    }
    stroke(0)
    ellipse(x[i]*scaleX, height - (y[x[i]]*scaleY), mag*3, mag*3);
    if (i < len-1) {
      if (mode == 'h') {
        stroke(hue,100,100);
      } else if (mode == 'l') {
        stroke(hue,50,100);
      }
      strokeWeight(mag*.3);
      line(x[i]*scaleX, height - (y[x[i]]*scaleY), (x[i+1])*scaleX, height - (y[x[i+1]]*scaleY));
      strokeWeight(.5);
    }
  }
  colorMode(RGB, 255);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
