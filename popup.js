// popup.js

// Import the createSnake function from snake.js
import { createSnake } from './snake.js';

// Get the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const screen = {
  width: 300,
  height: 300,
};

// Create the snake
const snake = createSnake();

// Create the food
const food = {
  posX: Math.floor(Math.random() * screen.width),
  posY: Math.floor(Math.random() * screen.height),
  sizeX: 10,
  sizeY: 10,
  color: 'red',
};

// Update the canvas
const updateCanvas = () => {
  ctx.clearRect(0, 0, screen.width, screen.height);

  // Draw the snake segments
  for (const segment of snake.segments) {
    ctx.fillStyle = segment.color;
    ctx.fillRect(segment.posX, segment.posY, segment.sizeX, segment.sizeY);
  }

  // Draw the food
  ctx.fillStyle = food.color;
  ctx.fillRect(food.posX, food.posY, food.sizeX, food.sizeY);
};

// Handle keypress events
const handleKeyPress = (event) => {
  const key = event.key.toLowerCase();
  if (key === 'w') {
    snake.changeDirection('up');
  } else if (key === 's') {
    snake.changeDirection('down');
  } else if (key === 'a') {
    snake.changeDirection('left');
  } else if (key === 'd') {
    snake.changeDirection('right');
  }
};

// Add event listener for keypress events
document.addEventListener('keydown', handleKeyPress);

// Check for collisions and reset food position
const checkCollision = () => {
  const head = snake.segments[0];
  if (head.posX === food.posX && head.posY === food.posY) {
    food.posX = Math.floor(Math.random() * screen.width);
    food.posY = Math.floor(Math.random() * screen.height);

    // Add new segment to the snake
    snake.grow();
  }
};

const checkBoundaries = () => {
  const head = snake.segments[0];
  if (head.posX < 0 || head.posY < 0 || head.posX >= screen.width || head.posY >= screen.height) {
    return true;
  }
  return false;
};

const gameOver = () => {
  alert("Game Over");
  clearInterval(gameInterval);
  location.reload();
};

// Game loop
const gameLoop = () => {
  snake.move();
  checkCollision();
  if (snake.checkSelfCollision() || checkBoundaries()) {
    gameOver();
  } else {
    updateCanvas();
  }
};

// Start the game loop
const gameInterval = setInterval(gameLoop, 100);
