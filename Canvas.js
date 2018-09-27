function Canvas() {
  this.base = document.querySelector('#canvas');
  this.ctx = this.base.getContext('2d');

  this.ctx.strokeStyle = '#BADA55';
  this.ctx.lineWidth = 2;
  this.ctx.lineJoin = 'round';
  this.ctx.lineCap = 'round';
}

Canvas.prototype.drawLine = function(cell1, cell2, options = {}) {
  let prev = {};

  Object.keys(options).forEach((key) => {
    prev[key] = this.ctx[key];
    this.ctx[key] = options[key];
  });

  this.ctx.beginPath();
  this.ctx.moveTo(cell1.x, cell1.y);
  this.ctx.lineTo(cell2.x, cell2.y);
  this.ctx.stroke();

  Object.keys(prev).forEach((key) => {
    this.ctx[key] = prev[key];
  });
}

Canvas.prototype.drawCell = function(cell) {
    let prevStyle = this.ctx.strokeStyle;
    let prevWidth = this.ctx.lineWidth;

    this.ctx.lineWidth = 16;
    this.ctx.strokeStyle = 'black';
    this.ctx.beginPath();
    this.ctx.moveTo(cell.x, cell.y);
    this.ctx.lineTo(cell.x, cell.y);
    this.ctx.stroke();

    this.ctx.strokeStyle = prevStyle;
    this.ctx.lineWidth = prevWidth;
}

Canvas.prototype.drawPath = function(cells) {
  let prevStyle = this.ctx.strokeStyle;
  let prevWidth = this.ctx.lineWidth;
  this.ctx.strokeStyle = 'red';

  for (let i = 0; i < cells.length - 1; i++) {
    this.drawLine(cells[i], cells[i + 1]);
  }

  this.ctx.strokeStyle = prevStyle;
}

Canvas.prototype.clearCanvas = function() {
  this.ctx.clearRect(0, 0, this.base.width, this.base.height);
}

Canvas.prototype.addListener = function(event, func) {
  this.base.addEventListener(event, func);
}