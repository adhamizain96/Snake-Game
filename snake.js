// snake.js

// Create the snake and export the createSnake function
export const createSnake = () => {
  const snake = {
    segments: [],
    direction: 'right',
  };

  const createSegment = (x, y) => {
    return {
      posX: x,
      posY: y,
      sizeX: 10,
      sizeY: 10,
      color: 'white',
    };
  };

  const initializeSnake = () => {
    const startingPos = [
      [0, 0],
      [-10, 0],
      [-20, 0],
    ];

    for (const pos of startingPos) {
      const segment = createSegment(pos[0], pos[1]);
      snake.segments.push(segment);
    }
  };

  initializeSnake();

  snake.move = () => {
    const head = { ...snake.segments[0] };

    if (snake.direction === 'up') {
      head.posY -= 10;
    } else if (snake.direction === 'down') {
      head.posY += 10;
    } else if (snake.direction === 'left') {
      head.posX -= 10;
    } else if (snake.direction === 'right') {
      head.posX += 10;
    }

    snake.segments.unshift(head);
    snake.segments.pop();
  };

  snake.changeDirection = (newDirection) => {
    if (newDirection === 'up' && snake.direction !== 'down') {
      snake.direction = 'up';
    } else if (newDirection === 'down' && snake.direction !== 'up') {
      snake.direction = 'down';
    } else if (newDirection === 'left' && snake.direction !== 'right') {
      snake.direction = 'left';
    } else if (newDirection === 'right' && snake.direction !== 'left') {
      snake.direction = 'right';
    }
  };

  snake.grow = () => {
    const tail = snake.segments[snake.segments.length - 1];
    const newTail = { ...tail };
    snake.segments.push(newTail);
  };

  snake.checkSelfCollision = () => {
    const [head, ...body] = snake.segments;
    return body.some(segment => segment.posX === head.posX && segment.posY === head.posY);
  };

  return snake;
};
