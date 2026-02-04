// Flappy Bird Game
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('scoreValue');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');
const startScreen = document.getElementById('startScreen');
const startBtn = document.getElementById('startBtn');

// Game variables
let gameState = 'start'; // 'start', 'playing', 'gameOver'
let score = 0;
let gameSpeed = 2;
let frameCount = 0;

// Bird object
const bird = {
    x: 50,
    y: canvas.height / 2,
    width: 34,
    height: 24,
    velocity: 0,
    gravity: 0.5,
    jumpPower: -8,
    color: '#FFD700'
};

// Pipes array
let pipes = [];
const pipeWidth = 80;
const pipeGap = 150;
const pipeMinHeight = 100;
const pipeMaxHeight = canvas.height - pipeGap - pipeMinHeight;

// Clouds for background
let clouds = [];

// Initialize clouds
function initClouds() {
    for (let i = 0; i < 5; i++) {
        clouds.push({
            x: Math.random() * canvas.width,
            y: Math.random() * (canvas.height / 3),
            width: 60 + Math.random() * 40,
            height: 30 + Math.random() * 20,
            speed: 0.5 + Math.random() * 0.5
        });
    }
}

// Draw cloud
function drawCloud(cloud) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(cloud.x, cloud.y, cloud.height/2, 0, Math.PI * 2);
    ctx.arc(cloud.x + cloud.width/4, cloud.y, cloud.height/2.5, 0, Math.PI * 2);
    ctx.arc(cloud.x + cloud.width/2, cloud.y, cloud.height/2.2, 0, Math.PI * 2);
    ctx.fill();
}

// Update clouds
function updateClouds() {
    clouds.forEach(cloud => {
        cloud.x -= cloud.speed;
        if (cloud.x + cloud.width < 0) {
            cloud.x = canvas.width + cloud.width;
            cloud.y = Math.random() * (canvas.height / 3);
        }
    });
}

// Draw bird
function drawBird() {
    ctx.save();
    ctx.translate(bird.x + bird.width/2, bird.y + bird.height/2);
    
    // Bird body
    ctx.fillStyle = bird.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, bird.width/2, bird.height/2, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Bird eye
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(8, -5, 6, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(10, -5, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Bird beak
    ctx.fillStyle = '#FF8C00';
    ctx.beginPath();
    ctx.moveTo(bird.width/2 - 5, 0);
    ctx.lineTo(bird.width/2 + 5, 0);
    ctx.lineTo(bird.width/2 - 5, 5);
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
}

// Draw pipe
function drawPipe(pipe) {
    // Top pipe
    const gradient1 = ctx.createLinearGradient(pipe.x, 0, pipe.x + pipeWidth, 0);
    gradient1.addColorStop(0, '#228B22');
    gradient1.addColorStop(1, '#32CD32');
    ctx.fillStyle = gradient1;
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);
    
    // Bottom pipe
    const gradient2 = ctx.createLinearGradient(pipe.x, canvas.height - pipe.bottomHeight, pipe.x + pipeWidth, canvas.height);
    gradient2.addColorStop(0, '#228B22');
    gradient2.addColorStop(1, '#32CD32');
    ctx.fillStyle = gradient2;
    ctx.fillRect(pipe.x, canvas.height - pipe.bottomHeight, pipeWidth, pipe.bottomHeight);
    
    // Pipe caps
    ctx.fillStyle = '#228B22';
    ctx.fillRect(pipe.x - 5, pipe.topHeight - 30, pipeWidth + 10, 30);
    ctx.fillRect(pipe.x - 5, canvas.height - pipe.bottomHeight, pipeWidth + 10, 30);
}

// Create new pipe
function createPipe() {
    const topHeight = pipeMinHeight + Math.random() * (pipeMaxHeight - pipeMinHeight);
    const bottomHeight = canvas.height - topHeight - pipeGap;
    
    pipes.push({
        x: canvas.width,
        topHeight: topHeight,
        bottomHeight: bottomHeight,
        passed: false
    });
}

// Update pipes
function updatePipes() {
    pipes.forEach((pipe, index) => {
        pipe.x -= gameSpeed;
        
        // Check if bird passed the pipe
        if (!pipe.passed && pipe.x + pipeWidth < bird.x) {
            pipe.passed = true;
            score++;
            scoreElement.textContent = score;
        }
        
        // Remove pipes that are off screen
        if (pipe.x + pipeWidth < 0) {
            pipes.splice(index, 1);
        }
    });
    
    // Create new pipes
    if (frameCount % 120 === 0) {
        createPipe();
    }
}

// Check collision
function checkCollision() {
    // Check ground and ceiling collision
    if (bird.y <= 0 || bird.y + bird.height >= canvas.height) {
        return true;
    }
    
    // Check pipe collision
    for (let pipe of pipes) {
        if (bird.x < pipe.x + pipeWidth &&
            bird.x + bird.width > pipe.x) {
            if (bird.y < pipe.topHeight ||
                bird.y + bird.height > canvas.height - pipe.bottomHeight) {
                return true;
            }
        }
    }
    
    return false;
}

// Game over
function gameOver() {
    gameState = 'gameOver';
    finalScoreElement.textContent = score;
    gameOverElement.classList.remove('hidden');
}

// Start game
function startGame() {
    gameState = 'playing';
    score = 0;
    pipes = [];
    bird.y = canvas.height / 2;
    bird.velocity = 0;
    frameCount = 0;
    scoreElement.textContent = score;
    startScreen.classList.add('hidden');
    gameOverElement.classList.add('hidden');
    
    if (clouds.length === 0) {
        initClouds();
    }
}

// Reset game
function resetGame() {
    startGame();
}

// Bird jump
function jump() {
    if (gameState === 'playing') {
        bird.velocity = bird.jumpPower;
    }
}

// Game loop
function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw clouds
    updateClouds();
    clouds.forEach(cloud => drawCloud(cloud));
    
    if (gameState === 'playing') {
        // Update bird physics
        bird.velocity += bird.gravity;
        bird.y += bird.velocity;
        
        // Update pipes
        updatePipes();
        
        // Check collision
        if (checkCollision()) {
            gameOver();
        }
        
        frameCount++;
    }
    
    // Draw pipes
    pipes.forEach(pipe => drawPipe(pipe));
    
    // Draw bird
    drawBird();
    
    // Continue game loop
    requestAnimationFrame(gameLoop);
}

// Event listeners
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', resetGame);

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        if (gameState === 'start') {
            startGame();
        } else if (gameState === 'playing') {
            jump();
        } else if (gameState === 'gameOver') {
            resetGame();
        }
    }
});

// Mouse/Touch controls
canvas.addEventListener('click', () => {
    if (gameState === 'playing') {
        jump();
    }
});

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (gameState === 'playing') {
        jump();
    }
});

// Initialize game
function init() {
    initClouds();
    gameLoop();
}

// Start the game
init();