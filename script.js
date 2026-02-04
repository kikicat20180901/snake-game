// 贪吃蛇游戏主逻辑
class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.overlay = document.getElementById('gameOverlay');
        this.overlayTitle = document.getElementById('overlayTitle');
        this.overlayMessage = document.getElementById('overlayMessage');
        
        // 游戏状态
        this.gameState = 'ready'; // ready, playing, paused, gameOver
        this.score = 0;
        this.highScore = localStorage.getItem('snakeHighScore') || 0;
        this.speed = 1;
        this.gridSize = 20;
        this.tileCount = this.canvas.width / this.gridSize;
        
        // 蛇的初始状态
        this.snake = [
            { x: 10, y: 10 }
        ];
        this.dx = 0;
        this.dy = 0;
        
        // 食物位置
        this.food = this.generateFood();
        
        // 游戏循环
        this.gameLoop = null;
        this.gameSpeed = 150; // 毫秒
        
        // 难度设置
        this.difficulty = 'medium';
        this.difficultySettings = {
            easy: { speed: 200, scoreMultiplier: 1 },
            medium: { speed: 150, scoreMultiplier: 1.2 },
            hard: { speed: 100, scoreMultiplier: 1.5 },
            extreme: { speed: 70, scoreMultiplier: 2 }
        };
        
        this.init();
    }
    
    init() {
        this.updateScoreDisplay();
        this.setupEventListeners();
        this.setupControls();
        this.drawGame();
        this.showOverlay('欢迎来到贪吃蛇游戏！', '使用方向键控制蛇的移动，按空格键开始游戏');
    }
    
    setupEventListeners() {
        // 开始按钮
        document.getElementById('startBtn').addEventListener('click', () => this.startGame());
        
        // 暂停/继续按钮
        document.getElementById('pauseBtn').addEventListener('click', () => this.pauseGame());
        document.getElementById('resumeBtn').addEventListener('click', () => this.resumeGame());
        
        // 重新开始按钮
        document.getElementById('restartBtn').addEventListener('click', () => this.restartGame());
        
        // 键盘控制
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // 难度设置
        document.getElementById('difficulty').addEventListener('change', (e) => {
            this.difficulty = e.target.value;
            this.updateGameSpeed();
        });
        
        // 网格大小设置
        document.getElementById('gridSize').addEventListener('change', (e) => {
            this.updateGridSize(parseInt(e.target.value));
        });
    }
    
    setupControls() {
        // 触摸控制（移动设备）
        let touchStartX = 0;
        let touchStartY = 0;
        
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
        });
        
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            const touch = e.changedTouches[0];
            const touchEndX = touch.clientX;
            const touchEndY = touch.clientY;
            
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            
            // 判断滑动方向
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // 水平滑动
                if (deltaX > 0 && this.dx !== -1) {
                    this.dx = 1; this.dy = 0; // 向右
                } else if (deltaX < 0 && this.dx !== 1) {
                    this.dx = -1; this.dy = 0; // 向左
                }
            } else {
                // 垂直滑动
                if (deltaY > 0 && this.dy !== -1) {
                    this.dx = 0; this.dy = 1; // 向下
                } else if (deltaY < 0 && this.dy !== 1) {
                    this.dx = 0; this.dy = -1; // 向上
                }
            }
        });
    }
    
    handleKeyPress(e) {
        if (this.gameState === 'ready' && e.key === ' ') {
            e.preventDefault();
            this.startGame();
            return;
        }
        
        if (this.gameState === 'playing') {
            switch(e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    if (this.dy !== 1) { this.dx = 0; this.dy = -1; }
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    if (this.dy !== -1) { this.dx = 0; this.dy = 1; }
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    if (this.dx !== 1) { this.dx = -1; this.dy = 0; }
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    if (this.dx !== -1) { this.dx = 1; this.dy = 0; }
                    break;
                case ' ':
                case 'Spacebar':
                    e.preventDefault();
                    this.pauseGame();
                    break;
                case 'r':
                case 'R':
                    e.preventDefault();
                    this.restartGame();
                    break;
            }
        }
        
        if (this.gameState === 'paused' && e.key === ' ') {
            e.preventDefault();
            this.resumeGame();
        }
        
        if (this.gameState === 'gameOver' && e.key === ' ') {
            e.preventDefault();
            this.restartGame();
        }
    }
    
    startGame() {
        if (this.gameState !== 'ready' && this.gameState !== 'gameOver') return;
        
        this.gameState = 'playing';
        this.hideOverlay();
        
        // 设置初始移动方向
        if (this.dx === 0 && this.dy === 0) {
            this.dx = 1; // 默认向右移动
            this.dy = 0;
        }
        
        this.startGameLoop();
    }
    
    pauseGame() {
        if (this.gameState !== 'playing') return;
        
        this.gameState = 'paused';
        this.stopGameLoop();
        this.showOverlay('游戏暂停', '按空格键继续游戏');
        document.getElementById('pauseBtn').style.display = 'none';
        document.getElementById('resumeBtn').style.display = 'inline-block';
    }
    
    resumeGame() {
        if (this.gameState !== 'paused') return;
        
        this.gameState = 'playing';
        this.hideOverlay();
        this.startGameLoop();
        document.getElementById('pauseBtn').style.display = 'inline-block';
        document.getElementById('resumeBtn').style.display = 'none';
    }
    
    restartGame() {
        this.stopGameLoop();
        this.resetGame();
        this.gameState = 'ready';
        this.showOverlay('游戏重新开始', '按空格键或点击开始游戏按钮');
    }
    
    resetGame() {
        this.snake = [{ x: 10, y: 10 }];
        this.dx = 0;
        this.dy = 0;
        this.food = this.generateFood();
        this.score = 0;
        this.speed = 1;
        this.updateScoreDisplay();
        this.drawGame();
        
        document.getElementById('pauseBtn').style.display = 'inline-block';
        document.getElementById('resumeBtn').style.display = 'none';
    }
    
    startGameLoop() {
        const speed = this.difficultySettings[this.difficulty].speed;
        this.gameLoop = setInterval(() => this.updateGame(), speed);
    }
    
    stopGameLoop() {
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
        }
    }
    
    updateGame() {
        if (this.gameState !== 'playing') return;
        
        this.moveSnake();
        this.checkCollisions();
        this.drawGame();
    }
    
    moveSnake() {
        const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };
        this.snake.unshift(head);
        
        // 检查是否吃到食物
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += Math.floor(10 * this.difficultySettings[this.difficulty].scoreMultiplier);
            this.food = this.generateFood();
            this.updateScoreDisplay();
            
            // 每吃5个食物增加速度
            if (this.score % 50 === 0) {
                this.speed++;
                this.updateGameSpeed();
                this.stopGameLoop();
                this.startGameLoop();
            }
        } else {
            this.snake.pop();
        }
    }
    
    checkCollisions() {
        const head = this.snake[0];
        
        // 检查墙壁碰撞
        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            this.gameOver();
            return;
        }
        
        // 检查自身碰撞
        for (let i = 1; i < this.snake.length; i++) {
            if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
                this.gameOver();
                return;
            }
        }
    }
    
    gameOver() {
        this.gameState = 'gameOver';
        this.stopGameLoop();
        
        // 更新最高分
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('snakeHighScore', this.highScore);
            this.showOverlay('🎉 新纪录！', `恭喜！你的分数：${this.score}，最高分：${this.highScore}`);
        } else {
            this.showOverlay('💥 游戏结束', `你的分数：${this.score}，最高分：${this.highScore}`);
        }
        
        this.updateScoreDisplay();
    }
    
    generateFood() {
        let newFood;
        do {
            newFood = {
                x: Math.floor(Math.random() * this.tileCount),
                y: Math.floor(Math.random() * this.tileCount)
            };
        } while (this.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        
        return newFood;
    }
    
    drawGame() {
        // 清空画布
        this.ctx.fillStyle = '#1a1a1a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制网格
        this.drawGrid();
        
        // 绘制蛇
        this.drawSnake();
        
        // 绘制食物
        this.drawFood();
        
        // 绘制状态信息
        this.drawStatus();
    }
    
    drawGrid() {
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i <= this.tileCount; i++) {
            const pos = i * this.gridSize;
            
            // 垂直线
            this.ctx.beginPath();
            this.ctx.moveTo(pos, 0);
            this.ctx.lineTo(pos, this.canvas.height);
            this.ctx.stroke();
            
            // 水平线
            this.ctx.beginPath();
            this.ctx.moveTo(0, pos);
            this.ctx.lineTo(this.canvas.width, pos);
            this.ctx.stroke();
        }
    }
    
    drawSnake() {
        this.snake.forEach((segment, index) => {
            const x = segment.x * this.gridSize;
            const y = segment.y * this.gridSize;
            
            if (index === 0) {
                // 蛇头
                const gradient = this.ctx.createRadialGradient(x + this.gridSize/2, y + this.gridSize/2, 0, x + this.gridSize/2, y + this.gridSize/2, this.gridSize/2);
                gradient.addColorStop(0, '#4CAF50');
                gradient.addColorStop(1, '#45a049');
                
                this.ctx.fillStyle = gradient;
                this.ctx.fillRect(x + 2, y + 2, this.gridSize - 4, this.gridSize - 4);
                
                // 蛇头边框
                this.ctx.strokeStyle = '#2E7D32';
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(x + 2, y + 2, this.gridSize - 4, this.gridSize - 4);
            } else {
                // 蛇身
                const gradient = this.ctx.createLinearGradient(x, y, x + this.gridSize, y + this.gridSize);
                gradient.addColorStop(0, '#66BB6A');
                gradient.addColorStop(1, '#4CAF50');
                
                this.ctx.fillStyle = gradient;
                this.ctx.fillRect(x + 1, y + 1, this.gridSize - 2, this.gridSize - 2);
            }
        });
    }
    
    drawFood() {
        const x = this.food.x * this.gridSize;
        const y = this.food.y * this.gridSize;
        
        // 食物发光效果
        this.ctx.shadowColor = '#FF5722';
        this.ctx.shadowBlur = 10;
        
        // 食物渐变
        const gradient = this.ctx.createRadialGradient(x + this.gridSize/2, y + this.gridSize/2, 0, x + this.gridSize/2, y + this.gridSize/2, this.gridSize/2);
        gradient.addColorStop(0, '#FF7043');
        gradient.addColorStop(1, '#E64A19');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(x + 2, y + 2, this.gridSize - 4, this.gridSize - 4);
        
        // 食物边框
        this.ctx.strokeStyle = '#BF360C';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x + 2, y + 2, this.gridSize - 4, this.gridSize - 4);
        
        // 重置阴影
        this.ctx.shadowColor = 'transparent';
        this.ctx.shadowBlur = 0;
    }
    
    drawStatus() {
        // 绘制游戏状态指示器
        if (this.gameState !== 'playing') {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(10, 10, 120, 30);
            
            this.ctx.fillStyle = 'white';
            this.ctx.font = '14px Orbitron';
            this.ctx.textAlign = 'center';
            
            let statusText = '';
            switch(this.gameState) {
                case 'ready': statusText = '准备开始'; break;
                case 'paused': statusText = '游戏暂停'; break;
                case 'gameOver': statusText = '游戏结束'; break;
            }
            
            this.ctx.fillText(statusText, 70, 30);
        }
    }
    
    updateScoreDisplay() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('highScore').textContent = this.highScore;
        document.getElementById('speed').textContent = this.speed;
    }
    
    updateGameSpeed() {
        // 根据难度和速度等级更新游戏速度
        const baseSpeed = this.difficultySettings[this.difficulty].speed;
        const speedMultiplier = Math.max(0.5, 1 - (this.speed - 1) * 0.1);
        this.gameSpeed = baseSpeed * speedMultiplier;
    }
    
    updateGridSize(newSize) {
        this.tileCount = newSize;
        this.gridSize = this.canvas.width / this.tileCount;
        
        // 重置游戏状态
        this.resetGame();
        
        // 确保蛇在网格范围内
        this.snake = this.snake.filter(segment => 
            segment.x < this.tileCount && segment.y < this.tileCount
        );
        
        if (this.snake.length === 0) {
            this.snake = [{ x: Math.floor(this.tileCount / 2), y: Math.floor(this.tileCount / 2) }];
        }
        
        // 重新生成食物
        this.food = this.generateFood();
        this.drawGame();
    }
    
    showOverlay(title, message) {
        this.overlayTitle.textContent = title;
        this.overlayMessage.textContent = message;
        this.overlay.style.display = 'flex';
    }
    
    hideOverlay() {
        this.overlay.style.display = 'none';
    }
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    const game = new SnakeGame();
    console.log('🐍 贪吃蛇游戏已加载完成！');
});