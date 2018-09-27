function Builder(canvas) {
  this.canvas = canvas;
  this.path = [];
  this.cells = [];
  this.percentage = 0;
  this.interval = null;
  this.CELL_RADIUS = 8;
};

Builder.prototype.getCellInMouse = function(coords) {
  for(let i = 0; i < this.cells.length; i++) {
    const cell = this.cells[i];
    if (
      coords.x > cell.x - this.CELL_RADIUS && coords.x < cell.x + this.CELL_RADIUS ||
      coords.y > cell.y - this.CELL_RADIUS && coords.y < cell.y + this.CELL_RADIUS
    ) {
      console.log(cell);
      return cell;
    }
  }
}

Builder.prototype.setCellDrag = function(id) {
  this.cells.forEach((cell) => {
    if (cell.id === id) {
      cell.isDrag = true;
    }
  });
}

Builder.prototype.clearDrags = function() {
  this.cells.forEach((cell) => {
    cell.isDrag = false;
  });
  console.log('clearDrags');
}

Builder.prototype.mouseMove = function(e) {
  for(let i = 0; i < this.cells.length; i++) {
    let cell = this.cells[i];

    if (cell.isDrag) {
      cell.x = e.offsetX;
      cell.y = e.offsetY;
      console.log(cell);
      return this.build(this.cells, { withLines: true });
    }
  }
}

Builder.prototype.drawLines = function(cells, options = {}) {
  if (cells.length === 1 && options.withCells) {
    return this.canvas.drawCell(cells[0]);
  }

  for (let i = 0; i < cells.length - 1; i++) {
    this.canvas.drawLine(cells[i], cells[i + 1]);
    
    if(options.withCells) {
      this.canvas.drawCell(cells[i]);
      this.canvas.drawCell(cells[i + 1]);
    }
  }
}

Builder.prototype.buildCells = function(cells, options = {}) {
  if (!cells.length) return;

  if (this.percentage > 100) {
    this.stop();
    this.percentage = 0;

    if (options.withLines) {
      this.drawLines(cells, { withCells: true });
    }

    this.canvas.drawPath(this.path);
    this.path = [];
    return;
  };

  if (cells.length === 1) {
    this.path.push(cells[0]);
    this.percentage++;
    
    if (options.visualize) {
      this.canvas.drawCell(cells[0]);
      this.canvas.drawPath(this.path);
    }

    return;
  }

  let newCells = [];

  for (let i = 0; i < cells.length - 1; i++) {
    newCells.push(this.createCell(cells[i], cells[i + 1], this.percentage));

    if (options.visualize) {
      const color = `hsl(${360 / cells.length * 10}, 100%, 50%)`;
      this.canvas.drawLine(cells[i], cells[i + 1], { strokeStyle: color });
    }
  };

  this.buildCells(newCells, options);
}

Builder.prototype.visualize = function(speed) {
  this.interval = setInterval(() => {
    this.canvas.clearCanvas();
    this.buildCells(this.cells, { visualize: true, withLines: true });
  }, speed);
}

Builder.prototype.createCell = (cell1, cell2, percentage) => ({
  x: cell1.x + (cell2.x - cell1.x) * percentage / 100,
  y: cell1.y + (cell2.y - cell1.y) * percentage / 100,
});

Builder.prototype.build = function(cells, options) {
  for (let i = 0; i <= 101; i++) {
    this.canvas.clearCanvas();
    this.buildCells(cells, options);
  }
}

Builder.prototype.clear = function(options = {}) {
  this.stop();
  this.path = [];
  this.percentage = 0;
  this.interval = null;
  this.canvas.clearCanvas();

  if (options.full) {
    this.cells = [];
  };
}


Builder.prototype.stop = function() {
  clearInterval(this.interval);
  this.interval = null;
}


Builder.prototype.addCell = function() {
  this.cells.push({ x: getRandomInt(700), y: getRandomInt(700), id: this.cells.length });
  if (!this.interval) {
    this.build(this.cells, { withLines: true });
  }
}