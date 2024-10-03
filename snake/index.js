const canvas = document.querySelector(".game__board");
const scoreElement = document.querySelector(".score");
const context = canvas.getContext("2d");
let xAppleCoordinate = 0;
let yAppleCoordinate = 0;
const ceilSize = 25;
let snakeLength = 5;
const snake = [];
let isRunning = false;
let xDirection = ceilSize;
let yDirection = 0;
let score = 0;

const generateAppleCoordinates = (max, min) => {
    xAppleCoordinate = Math.floor(Math.random() * (max / ceilSize - min)) * ceilSize;
    yAppleCoordinate = Math.floor(Math.random() * (max / ceilSize - min)) * ceilSize;
}
const drawApple = (x, y) => {
    const image = new Image();
    image.onload = function () {
        context.drawImage(image, x, y, 25, 25)
    }
    image.src = "assets/img/icons8-apple-48.png";

}

const generateSnake = () => {
    snake.push([0, ceilSize * 4]);
    snake.push([0, ceilSize * 3]);
    snake.push([0, ceilSize * 2]);
    snake.push([0, ceilSize * 1]);
    snake.push([0, 0]);
}

const drawSnake = () => {
    context.fillStyle = "red";
    snake.map((e) => {
        context.fillRect(e[0], e[1], ceilSize, ceilSize)
    })
}

const startGame = () => {
    isRunning = true;
    generateAppleCoordinates(500, 0);
    drawApple(xAppleCoordinate, yAppleCoordinate);
    generateSnake()
    drawSnake();

    loop();
}

const loop = () => {
    if (isRunning) {
        clearField()
        drawApple(xAppleCoordinate, yAppleCoordinate);
        drawSnake();
        moveSnake();
        setTimeout(loop, 200)
    } else {
        stopGame();
    }


}

const moveSnake = () => {
    const newHeadX = snake[0][0] + xDirection;
    const newHeadY = snake[0][1] + yDirection;
    snake.unshift([newHeadX, newHeadY]);

    if (newHeadX === xAppleCoordinate && newHeadY === yAppleCoordinate) {
        generateAppleCoordinates(500, 0);
        score += 1;
        scoreElement.innerHTML= score
        //add score
    } else {
        snake.pop()
    }

}

const clearField = () => {
    context.fillStyle = '#06D6A0';
    context.fillRect(0, 0, 500, 500)
}

startGame();


window.addEventListener('keydown', (event) => {
    console.log(event.key);

    if (event.key === 'ArrowDown') {
        yDirection += ceilSize;
        xDirection = 0
    }

    if (event.key === 'ArrowUp') {
        yDirection -= ceilSize;
        xDirection = 0
    }

    if (event.key === 'ArrowLeft') {
        yDirection = 0;
        xDirection -= ceilSize
    }

    if (event.key === 'ArrowRight') {
        yDirection = 0;
        xDirection += ceilSize
    }


})





