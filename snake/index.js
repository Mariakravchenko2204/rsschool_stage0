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
const fildSize = 400;
let currentDirection = 'right';
const audioEatApple = new Audio("assets/audio/poedanie-ukus-yabloka.mp3")

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

    for (let i = 0; i < snake.length; i++) {
        if (i === 0) {
            context.fillStyle = "yellow";

        } else {
            context.fillStyle = "red";
        }
        context.fillRect(snake[i][0], snake[i][1], ceilSize, ceilSize)
    }


    // snake.map((e) => {
    //     if(snake.indexOf(e) === Array.lastIndexOf(snake)){
    //         context.fillStyle = "yellow";
    //         console.log("head", e)
    //     }else{
    //         context.fillStyle = "red";
    //     }

    //     context.fillRect(e[0], e[1], ceilSize, ceilSize)
    // })
}

const checkHitWall = () => {
    const head = snake[0];
    console.log(head)
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



const startGame = () => {
    isRunning = true;
    generateAppleCoordinates(fildSize, 0);
    drawApple(xAppleCoordinate, yAppleCoordinate);
    generateSnake()
    drawSnake();

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
        scoreElement.innerHTML = score
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

const loop = () => {
    if (isRunning) {

        drawApple(xAppleCoordinate, yAppleCoordinate);
        drawSnake();


        moveSnake();
        checkHitWall();
        checkHitItSelf()

        setTimeout(loop, 300)
    } else {
        console.log("game over")

    }


}

startGame();


window.addEventListener('keydown', (event) => {
    console.log();

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





