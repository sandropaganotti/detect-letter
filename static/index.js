const cols = 20;
const rows = 20;
const mcols = 60;
const mrows = 60;
const interval = 5000;
const colors = initColors([]);

initCanvas(document.querySelector('canvas'), drawFn);
initPredictionAPI( document.querySelector('span[data-prediction]'), interval);

function initColors(arr) {
  for (var c = 0; c < cols; c++) {
    arr[c] = [];
    for (var r = 0; r < rows; r++) {
      arr[c][r] = 255;
    }
  }
  return arr;
}

function initCanvas(canvas, mouseMoveFn) {
  let isdrawing = false;
  const context = canvas.getContext('2d');
  const bbox = canvas.getBoundingClientRect();
  canvas.width = bbox.width;
  canvas.height = bbox.height;
  const cell_width = canvas.width / cols;
  const cell_height = canvas.height / rows;

  [['mouseup', false], ['mousedown', true]]
    .forEach(function (event) {
      canvas.addEventListener(event[0], function () {
        isdrawing = event[1];
      });
    });

  canvas.addEventListener('mousemove', function (event) {
    if (!isdrawing) {
      return;
    }
    mouseMoveFn(event, cell_width, cell_height, context);
  });
}

function drawFn(event, cell_width, cell_height, context) {
  const bbox = context.canvas.getBoundingClientRect();
  const offset_y = event.clientY - bbox.top;
  const offset_x = event.clientX - bbox.left;
  const row_pixel = offset_y - (offset_y % cell_height);
  const col_pixel = offset_x - (offset_x % cell_width);
  const row = parseInt(row_pixel / cell_height, 10);
  const col = parseInt(col_pixel / cell_width, 10);
  const color = colors[row][col] = Math.max(colors[row][col] - 180, 0);

  context.fillStyle = `rgb(${color},${color},${color})`;
  context.fillRect(col_pixel, row_pixel, cell_width, cell_height);
}

function initPredictionAPI(label, interval) {
  setInterval(function () {
    const matrix = [];
    const rcol = mcols / cols;
    const rrow = mrows / rows;

    for (let i = 0; i < mcols; i++) {
      matrix[i] = [];
      for (let l = 0; l < mrows; l++) {
        matrix[i][l] = colors[Math.floor(i / rcol)][Math.floor(l / rrow)];
      }
    }

    const params = new URLSearchParams();
    params.append(`symbol`, [].concat.apply([], matrix).join('|'));

    fetch('/check', {
      method: 'POST',
      body: params
    }).then(
      response => response.json()
    ).then(
      (data) => {
        label.textContent = data.response[0];
      }
    )
  }, interval);
}
