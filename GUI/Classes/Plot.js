class Plot {
  contrustor(x1, y1, x2, y2, superX, superY, superWidth, superHeight) {
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
    this.shapes = []
    this.visible = true;
  }

  step() {

  }

  show() {

  }
}
