import {update as updateSnake, draw as drawSnake,SNAKE_SPEED,
getSnakeHead, snakeIntersection} from './snake.js'
// const {SNAKE_SPEED} = require('./snake.js')
import {update as updateFood,draw as drawFood} from './food.js'
import {outsideGrid} from './grid.js'
let lastRenderTime = 0
const gameBoard = document.getElementById('game-board')
let gameOver = false

function main(currentTime) {
    if(gameOver) {
        if(confirm('You lost. Press ok to restart.')) {
            window.location = '/'
        }
        return
    }


    window.requestAnimationFrame(main) 
    const secondRenderTime = (currentTime - lastRenderTime) / 1000
    if(secondRenderTime < 1 / SNAKE_SPEED) return
    console.log("render")
    lastRenderTime = currentTime
    
    update()
    draw()
}

window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}