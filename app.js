const canvas = new Canvas();
const builder = new Builder(canvas);


const addCellButton = document.getElementsByClassName('menu__add-cell')[0];
const startButton = document.getElementsByClassName('menu__visualize')[0];
const clearButton = document.getElementsByClassName('menu__clear')[0];

addCellButton.addEventListener('click', (e) => {
  builder.addCell({ x: getRandomInt(500), y: getRandomInt(500) });
});

startButton.addEventListener('click', () => {
  builder.clear();
  builder.visualize(60);
});

clearButton.addEventListener('click', () => {
  builder.clear({ full: true});
});

canvas.addListener('mousedown', (e) => {
  const dragCell = builder.getCellInMouse({ x: e.offsetX, y: e.offsetY });

  if (dragCell) {
    builder.setCellDrag(dragCell.id);
  }
});

canvas.addListener('mousemove', builder.mouseMove.bind(builder));

canvas.addListener('mouseup', builder.clearDrags.bind(builder));
canvas.addListener('mouseout', builder.clearDrags.bind(builder));