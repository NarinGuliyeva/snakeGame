let foodX
let foodY
let snakeX = 5
let snakeY = 10
let velocityX = 0
let velocityY = 0
let snakeBody = []
let gameOver
let clearIntervalGame
let score = 0
let currentScore = document.querySelector(".score")
let currenHighScore = document.querySelector(".high-score")
let controlKeys = document.querySelectorAll(".controls i")

controlKeys.forEach ( (key)  => {
    key.addEventListener("click" , () => changeSnakePosition(  { key: key.dataset.key    } )  )
} ) 


let highScore = localStorage.getItem("high-score")
currenHighScore.innerHTML = ` High score: ${highScore}`

function changeFoodPosition() {
    foodX = Math.floor(Math.random() * 30) + 1
    foodY = Math.floor(Math.random() * 30) + 1
}
let alertGameOver = () => {
    clearInterval(clearIntervalGame)
    alert("Game Over ")
    location.reload()
}

let changeSnakePosition = (e) => {
    console.log(e);
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0
        velocityY = -1
    }
    else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0
        velocityY = 1
    }
    else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1
        velocityY = 0
    }
    else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1
        velocityY = 0
    }
}

let box = document.querySelector(".box")
let game = () => {
    if (gameOver) return alertGameOver()
    let box2 = ` <div class="food"  style="grid-area: ${foodY}/  ${foodX}"  >   </div>  `
    box2 += ` <div class="snake"  style="grid-area:  ${snakeY}/ ${snakeX}" >   </div>  `


    if (foodX === snakeX && foodY === snakeY) {
        snakeBody.push([foodX, foodY])
        score++
        currentScore.innerHTML = `Score: ${score}`
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore)
        changeFoodPosition()
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1]
    }

    snakeBody[0] = [snakeX, snakeY]
    snakeX += velocityX
    snakeY += velocityY

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true
    }

    for (i = 0; i < snakeBody.length; i++) {
        box2 += ` <div class="snake"  style="grid-area:  ${snakeBody[i][1]}/ ${snakeBody[i][0]}" >   </div>  `
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0])
            gameOver = true
    }
    box.innerHTML = box2
}
changeFoodPosition()
game()
clearIntervalGame = setInterval(game, 150)
document.addEventListener("keydown", changeSnakePosition)




