import React, { useState, useEffect, useCallback } from 'react';

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 5, y: 5 };
const GAME_SPEED = 150;

const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 }
};

function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [paused, setPaused] = useState(false);

  const generateFood = useCallback(() => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE)
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(DIRECTIONS.RIGHT);
    setGameOver(false);
    setScore(0);
    setGameStarted(true);
    setPaused(false);
  };

  const moveSnake = useCallback(() => {
    if (gameOver || !gameStarted || paused) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };
      head.x += direction.x;
      head.y += direction.y;

      // Check wall collision
      if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
        setGameOver(true);
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, gameStarted, paused, generateFood]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === ' ') {
      e.preventDefault();
      if (gameOver) {
        resetGame();
      } else if (gameStarted) {
        setPaused(prev => !prev);
      }
      return;
    }

    if (!gameStarted || gameOver || paused) return;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        if (direction !== DIRECTIONS.DOWN) setDirection(DIRECTIONS.UP);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (direction !== DIRECTIONS.UP) setDirection(DIRECTIONS.DOWN);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (direction !== DIRECTIONS.RIGHT) setDirection(DIRECTIONS.LEFT);
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (direction !== DIRECTIONS.LEFT) setDirection(DIRECTIONS.RIGHT);
        break;
      default:
        break;
    }
  }, [direction, gameOver, gameStarted, paused]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  const renderCell = (x, y) => {
    const isSnakeHead = snake[0].x === x && snake[0].y === y;
    const isSnakeBody = snake.slice(1).some(segment => segment.x === x && segment.y === y);
    const isFood = food.x === x && food.y === y;

    let cellClass = 'cell';
    if (isSnakeHead) cellClass += ' snake-head';
    else if (isSnakeBody) cellClass += ' snake-body';
    else if (isFood) cellClass += ' food';

    return <div key={`${x}-${y}`} className={cellClass} />;
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h1>🐍 Snake Game</h1>
        <div className="score">Score: {score}</div>
      </div>
      
      <div className="game-board">
        {Array.from({ length: BOARD_SIZE }, (_, y) =>
          Array.from({ length: BOARD_SIZE }, (_, x) => renderCell(x, y))
        )}
      </div>

      {!gameStarted && (
        <div className="game-overlay">
          <div className="overlay-content">
            <h2>Welcome to Snake Game!</h2>
            <p>Use arrow keys to control the snake</p>
            <p>Press SPACE to start</p>
          </div>
        </div>
      )}

      {paused && gameStarted && !gameOver && (
        <div className="game-overlay">
          <div className="overlay-content">
            <h2>Paused</h2>
            <p>Press SPACE to resume</p>
          </div>
        </div>
      )}

      {gameOver && (
        <div className="game-overlay">
          <div className="overlay-content">
            <h2>Game Over!</h2>
            <p>Final Score: {score}</p>
            <p>Press SPACE to play again</p>
          </div>
        </div>
      )}

      <div className="game-controls">
        <div className="controls-info">
          <p><strong>Controls:</strong></p>
          <p>↑ ↓ ← → Move snake</p>
          <p>SPACE - Start/Pause/Restart</p>
        </div>
        
        <div className="game-buttons">
          {!gameStarted ? (
            <button onClick={resetGame} className="game-button start-button">
              Start Game
            </button>
          ) : (
            <button 
              onClick={() => setPaused(!paused)} 
              className="game-button pause-button"
              disabled={gameOver}
            >
              {paused ? 'Resume' : 'Pause'}
            </button>
          )}
          
          <button onClick={resetGame} className="game-button restart-button">
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}

export default SnakeGame;