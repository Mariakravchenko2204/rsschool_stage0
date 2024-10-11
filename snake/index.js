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
const fildSize = 600;
let currentDirection = 'right';
const audioEatApple = new Audio("assets/audio/poedanie-ukus-yabloka.mp3");
const audioStartGame = new Audio("assets/audio/game_start.mp3");
const audioEndGame = new Audio("assets/audio/game_over.mp3");
let gameSpeed = 300;
let gameLoop = {};
let gameTime = 0;
let gameTimer = {};
const fieldColor = '#FFFD70';


const inputField = document.querySelector("#userName")
const popup = document.querySelector(".popup__wrapper");
const endGame = document.querySelector(".end__game__wrapper")
const submit__button = document.querySelector("#submit__button");
const userName = document.querySelector(".name");
const gameField = document.querySelector(".game__field");
const result = document.querySelector(".result");
const home = document.querySelector(".home");
const gameResult = localStorage.getItem('result') === null ? localStorage.setItem('result', JSON.stringify([])) : localStorage.getItem('result');
const statistics = document.querySelector('.statistics');
let uName = '';

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

const generateSnake = () => {
    snake = [];
    snake.push([0, ceilSize * 4]);
    snake.push([0, ceilSize * 3]);
    snake.push([0, ceilSize * 2]);
    snake.push([0, ceilSize * 1]);
    snake.push([0, 0]);
}

const drawSnake = () => {
    context.fillStyle = "#1645A2";
    for (let i = 0; i < snake.length; i++) {
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

const countGameTime = () => {
    gameTime++;
    const minutes = Math.floor(gameTime / 60);
    const seconds = gameTime - minutes * 60;
    const minutes4Display = minutes > 9 ? minutes : `0${minutes}`
    const seconds4Display = seconds > 9 ? seconds : `0${seconds}`
    timer.innerHTML = `Timer : ${minutes4Display}:${seconds4Display}`
}


const startGame = () => {
    audioStartGame.play();
    const user = localStorage.getItem('username');
    userName.innerHTML = `Name : ${user}`;
    timer.innerHTML = `Timer : 00:00`
    gameTimer = setInterval(countGameTime, 1000);
    xDirection = ceilSize;
    yDirection = 0;
    gameSpeed = 300;
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
        if (gameSpeed > 50) {
            gameSpeed = gameSpeed - 10;
        }
        scoreElement.innerHTML = score;
    } else {
        const tail = snake[snake.length - 1]
        clearField(tail[0], tail[1])
        snake.pop()
    }
}

const clearField = (x, y) => {
    context.fillStyle = fieldColor;
    context.fillRect(x, y, ceilSize, ceilSize);
}

const clearBoard = () => {
    context.fillStyle = fieldColor;
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

const submitUserName = () => {
    if (inputField.value !== "") {
        uName = inputField.value;
    }
    clearBoard();
    clearTimeout(gameLoop);
    clearInterval(gameTimer);
    score = 0;
    currentDirection = 'right'
    scoreElement.innerHTML = score;
    gameTime = 0;
    localStorage.setItem("username", inputField.value);
    popup.style.animationName = 'dissapear';
    popup.classList.toggle('hidden');
    gameField.classList.toggle('hidden')
    startGame();
}

const displayGameOver = () => {
    audioEndGame.play();
    result.innerHTML = `Your result : ${score}`;
    const gameResult = JSON.parse(localStorage.getItem('result'));
    if (gameResult.length === 10 || gameResult.length > 10) {
        gameResult.shift();
    }
    gameResult.push({
        name: uName,
        result: score,
    })
    statistics.innerHTML = '';
    for (let i = 0; i < gameResult.length; i++) {
        const p = document.createElement('p');
        p.innerHTML = `${i + 1}. ${gameResult[i].name} : ${gameResult[i].result}`;
        statistics.appendChild(p);
    }
    localStorage.setItem('result', JSON.stringify(gameResult));
    endGame.classList.toggle('hidden')
}
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
    clearBoard();
    clearTimeout(gameLoop);
    clearInterval(gameTimer);
    score = 0;
    currentDirection = 'right'
    scoreElement.innerHTML = score;
    gameTime = 0;
    endGame.classList.toggle('hidden');
    startGame();
})

submit__button.addEventListener('click', () => {
    submitUserName()
})

window.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        submitUserName()
    }
})

home.addEventListener('click', () => {
    inputField.value = '';
    endGame.classList.toggle('hidden');
    gameField.classList.toggle('hidden')
    popup.classList.toggle('hidden');
})