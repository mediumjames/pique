class Pane {
  constructor(x1, y1, x2, y2, superX, superY, superWidth, superHeight, color) {
    this.x1 = x1;
    this.y1 = y1
    this.x2 = x2;
    this.y2 = y2;
    this.superX = superX;
    this.superY = superY;
    this.superWidth = superWidth;
    this.superHeight = superHeight;
    this.color = color;
    this.realX = this.superX + (this.x1 * this.superWidth);
    this.realY = this.superY + (this.y1 * this.superHeight);
    this.realWidth = (this.x2 - this.x1) * this.superWidth;
    this.realHeight = (this.y2 - this.y1) * this.superHeight;
    this.objects = {panes: [], buttons: [], charts: []};
    this.visible = true;
  }

  step() {
    this.realX = this.superX + (this.x1 * this.superWidth);
    this.realY = this.superY + (this.y1 * this.superHeight);
    this.realWidth = (this.x2 - this.x1) * this.superWidth;
    this.realHeight = (this.y2 - this.y1) * this.superHeight;

    for (var i=0; i < this.objects.panes.length; i++) {
      var pane = this.objects.panes[i];
      pane.superX = this.realX;
      pane.superY = this.realY;
      pane.superWidth = this.realWidth;
      pane.superHeight = this.realHeight;
      pane.step();
    }

    for (var i=0; i < this.objects.charts.length; i++) {
      var chart = this.objects.charts[i];
      chart.superX = this.realX;
      chart.superY = this.realY;
      chart.superWidth = this.realWidth;
      chart.superHeight = this.realHeight;
      chart.step();
    }
  }

  show() {
    fill(this.color);
    strokeWeight(.3);
    if(this.visible == true) {
      rect(this.realX, this.realY, this.realWidth, this.realHeight);

      for (var i=0; i < this.objects.panes.length; i++) {
        var pane = this.objects.panes[i];
        pane.show();
      }
      for (var i=0; i < this.objects.charts.length; i++) {
        var chart = this.objects.charts[i];
        chart.show();
      }
    }
  }
}
