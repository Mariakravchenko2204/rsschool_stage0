const canvas = document.querySelector(".game__board");
const scoreElement = document.querySelector(".score");
const resetButton = document.querySelector(".reset");
const context = canvas.getContext("2d");
const timer = document.querySelector(".timer");
let xAppleCoordinate = 0;
let yAppleCoordinate = 0;
const ceilSize = 25;
let snakeLength = 5;
let snake = [];
let isRunning = false;
let xDirection = ceilSize;
let yDirection = 0;
let score = 0;
const fildSize = 400;
let currentDirection = 'right';
const audioEatApple = new Audio("assets/audio/poedanie-ukus-yabloka.mp3");
let gameSpeed = 300;
let gameLoop = {};
let gameTime = 0;
let gameTimer = {};

const generateAppleCoordinates = (max, min) => {

    let foundUnique = false

    while (!foundUnique) {
        xAppleCoordinate = Math.floor(Math.random() * (max / ceilSize - min)) * ceilSize;
        yAppleCoordinate = Math.floor(Math.random() * (max / ceilSize - min)) * ceilSize;

        snake.map(e => {
            if (e[0] !== xAppleCoordinate && e[1] !== yAppleCoordinate) {
                foundUnique = true;
            }
        })
    }
}
const drawApple = (x, y) => {
    const image = new Image();
    image.onload = function () {
        context.drawImage(image, x, y, 25, 25)
    }
    image.src = "assets/img/icons8-apple-48.png";
}

const displayGameOver = () => {
    const image = new Image();
    image.onload = function () {
        context.drawImage(image, fildSize/2 - 96/2, fildSize/2 - 96/2)
    }
    image.src = "assets/img/icons8-game-over-96.png";

}

const generateSnake = () => {
    snake = [];
    snake.push([0, ceilSize * 4]);
    snake.push([0, ceilSize * 3]);
    snake.push([0, ceilSize * 2]);
    snake.push([0, ceilSize * 1]);
    snake.push([0, 0]);
}

const drawSnake = () => {

    for (let i = 0; i < snake.length; i++) {
        if (i === 0) {
            context.fillStyle = "yellow";

        } else {
            context.fillStyle = "red";
        }
        context.fillRect(snake[i][0], snake[i][1], ceilSize, ceilSize)
    }



}

const checkHitWall = () => {
    const head = snake[0];

    if (head[0] < 0 || head[0] > fildSize || head[1] < 0 || head[1] > fildSize) {
        isRunning = false;
    }
}

const checkHitItSelf = () => {
    const head = snake[0];
    for (let i = 1; i < snake.length; i++) {
        if (head[0] === snake[i][0] && head[1] === snake[i][1]) {
            isRunning = false;
        }
    }
}

const countGameTime =  () => {
    gameTime++;
    const minutes = Math.floor(gameTime / 60);
    const seconds = gameTime - minutes * 60;
    const minutes4Display = minutes > 9 ? minutes : `0${minutes}`
    const seconds4Display = seconds > 9 ? seconds : `0${seconds}`
    timer.innerHTML = `Timer : ${minutes4Display}:${seconds4Display}`
}


const startGame = () => {
     timer.innerHTML = `Timer : 00:00`
    gameTimer = setInterval(countGameTime, 1000);
    xDirection = ceilSize;
    yDirection = 0;
    generateSnake()
    generateAppleCoordinates(fildSize, 0);
    drawApple(xAppleCoordinate, yAppleCoordinate);
    drawSnake();
    isRunning = true;
    loop();
    
}



const moveSnake = () => {
    const newHeadX = snake[0][0] + xDirection;
    const newHeadY = snake[0][1] + yDirection;
    snake.unshift([newHeadX, newHeadY]);

    if (newHeadX === xAppleCoordinate && newHeadY === yAppleCoordinate) {
        audioEatApple.play()
        generateAppleCoordinates(fildSize, 0);
        score += 1;
        clearTimeout(gameLoop);
        if (gameSpeed > 50){
            gameSpeed = gameSpeed - 10;
        }
        scoreElement.innerHTML = score;
       
        //add score
    } else {
        const tail = snake[snake.length - 1]
        clearField(tail[0], tail[1])
        snake.pop()
    }
}

const clearField = (x, y) => {
    context.fillStyle = '#06D6A0';
    context.fillRect(x, y, ceilSize, ceilSize);
}

const clearBoard = () => {
    context.fillStyle = '#06D6A0';
    context.fillRect(0, 0, fildSize, fildSize);
}

const loop = () => {
    if (isRunning) {
        drawApple(xAppleCoordinate, yAppleCoordinate);
        drawSnake();
        moveSnake();
        checkHitWall();
        checkHitItSelf()
        gameLoop = setTimeout(loop, gameSpeed);
    } else {
        clearTimeout(gameLoop);
        clearInterval(gameTimer);
        displayGameOver();
    }
}

startGame();

window.addEventListener('keydown', (event) => {

    if (event.key === 'ArrowDown' && currentDirection !== 'down') {
        yDirection += ceilSize;
        xDirection = 0
        currentDirection = 'down';
    }

    if (event.key === 'ArrowUp' && currentDirection !== 'up') {
        yDirection -= ceilSize;
        xDirection = 0;
        currentDirection = 'up';
    }

    if (event.key === 'ArrowLeft' && currentDirection !== 'left') {
        yDirection = 0;
        xDirection -= ceilSize;
        currentDirection = 'left';
    }

    if (event.key === 'ArrowRight' && currentDirection !== 'right') {
        yDirection = 0;
        xDirection += ceilSize;
        currentDirection = 'right';
    }
})

resetButton.addEventListener("click", () => {
    isRunning = false;
    clearBoard();
    clearTimeout(gameLoop);
    clearInterval(gameTimer);
    score = 0;
    currentDirection = 'right'
    scoreElement.innerHTML = score;
    gameTime = 0; 

    startGame();
})





