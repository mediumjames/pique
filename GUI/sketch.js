var files = [];
var data = [];

function preload() {
  files.push(loadStrings('test.txt'));
}

function setup() {
  for (var i=0; i < files.length; i++) {
    data.push(CSVInput(files[i]));
  }
  masterPane = new Pane(0, 0, 1, 1, 0, 0, windowWidth, windowHeight, '#14161A');
  fileSystemPane = new Pane(0, 0, 0.2, 1, masterPane.realX, masterPane.realY, masterPane.realWidth, masterPane.realHeight, '#222226');
  viewControlPane = new Pane(.85, 0, 1, 1, masterPane.realX, masterPane.realY, masterPane.realWidth, masterPane.realHeight, '#222226');
  dataViewPane = new Pane(.2, .9, .85, 1, masterPane.realX, masterPane.realY, masterPane.realWidth, masterPane.realHeight, '#09090D');
  chartPane = new Pane(.2, 0, .85, .9, masterPane.realX, masterPane.realY, masterPane.realWidth, masterPane.realHeight, '#111115');
  chart = new Chart(.05, .05, .95, .95, chartPane.realX, chartPane.realY, chartPane.realWidth, chartPane.realHeight, '#111111');

  chart.plots.push("hi");
  chartPane.objects.charts.push(chart);
  masterPane.objects.panes.push(fileSystemPane);
  masterPane.objects.panes.push(viewControlPane);
  masterPane.objects.panes.push(dataViewPane);
  masterPane.objects.panes.push(chartPane);

}

function draw()  {
  createCanvas(windowWidth, windowHeight);
  background(0);
  masterPane.superWidth = windowWidth;
  masterPane.superHeight = windowHeight;
  masterPane.step();
  masterPane.show();
  /*
  createCanvas(width,height+50);
  background(115, 134, 120);
  stroke(0);
  fill(0);
  strokeWeight(.1);
  for(var i=0; i < rows-1; i++) {
    line(0, i*scaleY, width, i*scaleY);
  }
  for (var x=0; x < cols-1; x++) {
    strokeWeight(.2);
    line(x*scaleX, height+50, x*scaleX, 0);
    strokeWeight(1);
    line(x*scaleX, height - (y[x]*scaleY), (x+1)*scaleX, height - (y[x+1]*scaleY));
    strokeWeight(.5);
    line(x*scaleX, height - (lows[x]*scaleY), x*scaleX, height - (highs[x]*scaleY));
    ellipse(x*scaleX, height - (y[x]*scaleY), 1, 1);
  }

  stroke(0);
  strokeWeight(.5);
/*
  plotPeaks(highs, top5, 'h', 5, 0);
  plotPeaks(highs, top5, 'l', 5, 0);
  plotPeaks(lows, bot5, 'h', 5, 62);
  plotPeaks(lows, bot5, 'l', 5, 62);

  plotPeaks(highs, top4, 'h', 4, 0);
  plotPeaks(highs, top4, 'l', 4, 0);
  plotPeaks(lows, bot4, 'h', 4, 62);
  plotPeaks(lows, bot4, 'l', 4, 62);

  plotPeaks(highs, top3, 'h', 3, 0);
  plotPeaks(highs, top3, 'l', 3, 0);
  plotPeaks(lows, bot3, 'h', 3, 62);
  plotPeaks(lows, bot3, 'l', 3, 62);

  plotPeaks(highs, top2, 'h', 2, 0);
  plotPeaks(highs, top2, 'l', 2, 0);
  plotPeaks(lows, bot2, 'h', 2, 62);
  plotPeaks(lows, bot2, 'l', 2, 62);

  plotPeaks(highs, top1, 'h', 1, 0);
  plotPeaks(highs, top1, 'l', 1, 0);
  plotPeaks(lows, bot1, 'h', 1, 62);
  plotPeaks(lows, bot1, 'l', 1, 62);
*/
}

function CSVInput(file) {
  var xs = [];
  var opens = [];
  var closes = [];
  var highs = [];
  var lows = [];

  var str = '';
  for (var i=0; i < file.length; i++) {
    str += file[i];
    str += '\n';
  }

  var data = Papa.parse(str, {
    header: true,
    dynamicTyping: true,
  }).data;

  for (var i=0; i < data.length; i++) {
    xs.push(data[i].Date);
    opens.push(data[i].Open);
    closes.push(data[i].Close);
    highs.push(data[i].High);
    lows.push(data[i].Low);
  }

  var rv = {x: xs, open: opens, close: closes, high: highs, low: lows};
  return rv;
}

function getSubArray(arr, ind) {
  var rv = [];
  for (i=0; i < ind.length; i++) {
    rv.push(arr[ind[i]]);
  }
  return rv;
}

function prepPeaksPlot(num, xs, highs, lows) {
  var rv = [];

  var tops = [];
  var bots = [];

  var topHighs = [];
  var topHighsX = [];
  var topHighsY = [];

  var topLows = [];
  var topLowsX = [];
  var topLowsY = [];

  var botHighs = [];
  var botHighsX = [];
  var botHighsY = [];

  var botLows = [];
  var botLowsX = [];
  var botLowsY = [];

  tops.push(getPeaks(highs));
  bots.push(getPeaks(lows));
  for(var i=1; i < num; i++) {
    tops.push(getPeaks(highs, tops[i-1]));
    bots.push(getPeaks(lows, bots[i-1]));
  }

  for (var i=2; i < num; i++) {

    for (var j=0; j < tops[i].hlen; j++) {
      rv.push(
        {
          type: 'rect',
          xref: 'x',
          yref: 'y',
          x0: xs[tops[i].h[j]],
          y0: 0,
          x1: xs[tops[i].h[j]+1],
          y1: size[i],
          fillcolor: topHighColor,
          opacity: opacity,
          line: {
              width: 0
          }
        }
      );
    }

    for (var j=0; j < tops[i].llen; j++) {
      rv.push(
        {
          type: 'rect',
          xref: 'x',
          yref: 'y',
          x0: xs[tops[i].l[j]],
          y0: 0,
          x1: xs[tops[i].l[j]+1],
          y1: size[i],
          fillcolor: topLowColor,
          opacity: opacity,
          line: {
              width: 0
          }
        }
      );
    }
    for (var j=0; j < bots[i].hlen; j++) {
      rv.push(
        {
          type: 'rect',
          xref: 'x',
          yref: 'y',
          x0: xs[bots[i].h[j]],
          y0: 0,
          x1: xs[bots[i].h[j]+1],
          y1: size[i],
          fillcolor: botHighColor,
          opacity: opacity,
          line: {
              width: 0
          }
        }
      );

    }

    for (var j=0; j < bots[i].llen; j++) {
      rv.push(
        {
          type: 'rect',
          xref: 'x',
          yref: 'y',
          x0: xs[bots[i].l[j]],
          y0: 0,
          x1: xs[bots[i].l[j]+1],
          y1: size[i],
          fillcolor: botLowColor,
          opacity: opacity,
          line: {
              width: 0
          }
        }
      );
    }
/*

    topHighsX.push(getSubArray(xs, tops[i].h));
    topHighsY.push(getSubArray(highs, tops[i].h));

    topLowsX.push(getSubArray(xs, tops[i].l));
    topLowsY.push(getSubArray(highs, tops[i].l));

    botHighsX.push(getSubArray(xs, bots[i].h));
    botHighsY.push(getSubArray(lows, bots[i].h));

    botLowsX.push(getSubArray(xs, bots[i].l));
    botLowsY.push(getSubArray(lows, bots[i].l));

    topHighs.push(
      {
        x: topHighsX[i],
        y: topHighsY[i],
        type: 'scatter',
        mode: 'markers',
        marker: {
          size: size[i],
          color: topHighColor
        },
      }
    );
    topLows.push(
      {
        x: topLowsX[i],
        y: topLowsY[i],
        type: 'scatter',
        mode: 'markers',
        marker: {
          size: size[i],
          color: topLowColor
        },
      }
    );
    botHighs.push(
      {
        x: botHighsX[i],
        y: botHighsY[i],
        type: 'scatter',
        mode: 'markers',
        marker: {
          size: size[i],
          color: botHighColor
        },
      }
    );
    botLows.push(
      {
        x: botLowsX[i],
        y: botLowsY[i],
        type: 'scatter',
        mode: 'markers',
        marker: {
          size: size[i],
          color: botLowColor
        },
      }
    );
    */
  }
  return rv;
}
