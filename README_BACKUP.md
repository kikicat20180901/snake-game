# 🐍 Snake Game

A classic Snake game implementation in Python with a beautiful terminal interface!

![Snake Game](https://img.shields.io/badge/Python-3.6+-blue.svg)
![Terminal](https://img.shields.io/badge/Terminal-Based-green.svg)
![Game](https://img.shields.io/badge/Type-Arcade-red.svg)

## 🎮 Features

- **Smooth Controls**: Responsive arrow key controls
- **Beautiful UI**: Emoji-based graphics with border design
- **Pause Function**: Pause/resume gameplay with 'P' key
- **Score System**: Track your score as you eat food
- **Game States**: Proper game over and pause handling
- **Collision Detection**: Wall and self-collision detection
- **Food Generation**: Random food placement avoiding snake body

## 🚀 How to Play

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/snake-game.git
cd snake-game

# Make the game executable
chmod +x snake_game.py

# Run the game
python3 snake_game.py
```

### Controls
- **↑ ↓ ← →**: Move the snake
- **P**: Pause/Resume game
- **Q**: Quit game

### Objective
Control the snake to eat food (🍎) and grow longer. Avoid hitting walls or the snake's own body. Each food item gives you 10 points!

## 🎯 Game Rules

1. **Movement**: Use arrow keys to change direction
2. **Eating**: When the snake head touches food, it grows and you score 10 points
3. **Growth**: The snake grows longer with each food eaten
4. **Collision**: Game ends if you hit walls or the snake's own body
5. **Winning**: Try to achieve the highest score possible!

## 🛠️ Technical Details

### Requirements
- Python 3.6+
- `curses` module (usually included with Python)

### Code Structure
```
snake_game.py
├── SnakeGame class
│   ├── init_game()      # Initialize game state
│   ├── place_food()     # Random food placement
│   ├── handle_input()   # Process user input
│   ├── update_game()    # Update game logic
│   ├── draw()          # Render game screen
│   └── run()           # Main game loop
└── main()              # Entry point
```

### Key Features
- **Non-blocking Input**: Smooth gameplay with curses
- **Collision Detection**: Comprehensive wall and self-collision
- **Food Placement**: Smart placement avoiding snake body
- **Game States**: Proper handling of pause, game over, and running states
- **Terminal Graphics**: Clean UI with borders and emoji

## 🎨 Customization

You can easily customize the game by modifying these parameters in the code:

```python
# Game speed (lower = faster)
time.sleep(0.1)

# Starting snake length
self.snake = deque([(start_y, start_x), (start_y, start_x-1), (start_y, start_x-2)])

# Food emoji
self.screen.addstr(food_y, food_x, '🍎')

# Snake appearance
self.screen.addstr(y, x, '🐍')  # Head
self.screen.addstr(y, x, '🟢')  # Body
```

## 🐛 Troubleshooting

### Terminal Issues
If you encounter display issues, ensure your terminal supports:
- Unicode characters (for emojis)
- ANSI escape sequences
- Proper cursor handling

### Python Version
Make sure you're using Python 3.6 or higher:
```bash
python3 --version
```

### Permissions
If the game won't run, check file permissions:
```bash
chmod +x snake_game.py
```

## 🤝 Contributing

Feel free to contribute improvements! Some ideas:
- High score persistence
- Different difficulty levels
- Sound effects
- Color themes
- Multiplayer mode

## 📄 License

This project is open source and available under the MIT License.

## 🏆 High Scores

Challenge yourself and friends to beat your high score! The game tracks your current session score - how high can you go?

---

**Enjoy the game!** 🎮✨

Made with ❤️ using Python and curses