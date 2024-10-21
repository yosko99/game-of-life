const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;

const BOX_SIZE = 5;

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const data = Array.from(Array(CANVAS_WIDTH + 1), () => new Array(CANVAS_HEIGHT + 1));

function initializeRandomGrid() {
    for (let i = 0; i < CANVAS_WIDTH; i++) {
        data[i] = [];
        for (let j = 0; j < CANVAS_HEIGHT; j++) {
            data[i][j] = Math.random() > 0.96 ? 1 : 0;
        }
    }
}

const getNeighbours = (x, y) => {
    let neighbours = 0;

    // TOP LEFT
    if((x - BOX_SIZE >= 0 && y - BOX_SIZE >= 0) && data[x - BOX_SIZE][y - BOX_SIZE]) {
        neighbours += 1;
    }

    // TOP
    if(y - BOX_SIZE >= 0 && data[x][y - BOX_SIZE]) {
        neighbours += 1;
    }

    // TOP RIGHT
    if((x + BOX_SIZE <= CANVAS_WIDTH && y - BOX_SIZE >= 0) && data[x + BOX_SIZE][y - BOX_SIZE]) {
        neighbours += 1;
    }

    // LEFT
    if(x - BOX_SIZE >= 0 && data[x - BOX_SIZE][y]) {
        neighbours += 1;
    }

    // RIGHT
    if(x + BOX_SIZE <= CANVAS_WIDTH && data[x + BOX_SIZE][y]) {
        neighbours += 1;
    }

    // BOTTOM LEFT
    if((x - BOX_SIZE >= 0 && y + BOX_SIZE <= CANVAS_HEIGHT) && data[x - BOX_SIZE][y + BOX_SIZE]) {
        neighbours += 1;
    }

    // BOTTOM
    if(y + BOX_SIZE <= CANVAS_HEIGHT && data[x][y + BOX_SIZE]) {
        neighbours += 1;
    }

    // BOTTOM RIGHT
    if((x + BOX_SIZE <= CANVAS_WIDTH && y + BOX_SIZE <= CANVAS_HEIGHT) && data[x + BOX_SIZE][y + BOX_SIZE]) {
        neighbours += 1;
    }

    return neighbours;
}

const updateCell = (x, y) => {
    const neighbours = getNeighbours(x, y);

    if(data[x][y] === 1) {
        if(neighbours < 2 || neighbours > 3) {
            data[x][y] = 0;
        }

        if(neighbours === 2 || neighbours === 3) {
            data[x][y] = 1;
        }
    }

    if (data[x][y] === 0 && neighbours === 3) {
        data[x][y] = 1;
    }
}

function drawBoard(){
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    context.beginPath();

    for (let x = 0; x <= CANVAS_WIDTH; x += BOX_SIZE) {
        for (let y = 0; y <= CANVAS_HEIGHT; y += BOX_SIZE) {
            context.fillStyle = 'black';
            context.fillRect(x, y, BOX_SIZE, BOX_SIZE);

            if(data[x][y] === 1) {
                context.fillStyle = 'white';
                context.fillRect(x, y, BOX_SIZE, BOX_SIZE);
            }
        }
    }


    for (let x = 0; x <= CANVAS_WIDTH; x += BOX_SIZE) {
        for (let y = 0; y <= CANVAS_HEIGHT; y += BOX_SIZE) {
            updateCell(x, y);
        }
    }

    context.stroke();
}

const updateCanvasSize = () => {
    const PADDING = 20;

    canvas.width = window.innerWidth - PADDING;
    canvas.height = window.innerHeight - PADDING;
}

initializeRandomGrid();
updateCanvasSize();

setInterval(() => {
    drawBoard();
}, 60)
