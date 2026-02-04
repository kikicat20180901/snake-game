# Flappy Bird Game

A fully functional Flappy Bird game built with HTML5 Canvas, CSS, and JavaScript. This game features smooth animations, responsive controls, and automatic deployment to GitHub Pages.

## 🎮 Features

- **Smooth Gameplay**: Physics-based bird movement with gravity and jump mechanics
- **Responsive Controls**: Support for keyboard (Space), mouse click, and touch controls
- **Mobile-Friendly**: Responsive design that works on desktop and mobile devices
- **Score System**: Track your score as you pass through pipes
- **Beautiful Graphics**: Gradient backgrounds, animated clouds, and detailed sprites
- **Game States**: Start screen, gameplay, and game over functionality
- **Automatic Deployment**: GitHub Actions workflow for GitHub Pages deployment

## 🚀 How to Play

1. Click "Start Game" or press SPACE to begin
2. Click, tap, or press SPACE to make the bird jump
3. Navigate through the gaps between pipes
4. Score points for each pipe you successfully pass
5. Game ends if you hit a pipe or the ground/ceiling

## 🛠️ Technical Details

### Technologies Used
- **HTML5 Canvas**: For game rendering and animations
- **CSS3**: For styling and responsive design
- **Vanilla JavaScript**: For game logic and physics
- **GitHub Actions**: For automated deployment

### Game Mechanics
- **Physics**: Realistic gravity and jump mechanics
- **Collision Detection**: Precise collision detection with pipes and boundaries
- **Pipe Generation**: Procedurally generated pipes with random gap positions
- **Background Animation**: Moving clouds for visual appeal

## 📱 Controls

- **Keyboard**: Press SPACE to jump
- **Mouse**: Click anywhere on the game area to jump
- **Touch**: Tap on mobile devices to jump

## 🚀 Deployment

This project is configured for automatic deployment to GitHub Pages:

1. Fork or clone this repository
2. Push to the `main` or `master` branch
3. GitHub Actions will automatically deploy to GitHub Pages
4. Your game will be available at `https://[your-username].github.io/[repository-name]/`

## 📁 Project Structure

```
├── index.html          # Main HTML file with game canvas
├── style.css           # Game styling and responsive design
├── game.js            # Main game logic and mechanics
├── .github/
│   └── workflows/
│       └── deploy.yml # GitHub Actions deployment configuration
└── README.md          # Project documentation
```

## 🎯 Game Features

- **Smooth Animations**: 60 FPS game loop with requestAnimationFrame
- **Responsive Design**: Adapts to different screen sizes
- **Visual Effects**: Gradient backgrounds and animated elements
- **Score Tracking**: Real-time score display
- **Game States**: Start screen, gameplay, and game over screens
- **Restart Functionality**: Easy game restart after game over

## 🔧 Customization

You can easily customize various aspects of the game:

- **Colors**: Modify bird, pipes, and background colors in the CSS
- **Difficulty**: Adjust pipe gap size, game speed, and gravity in game.js
- **Graphics**: Replace the drawing functions with your own sprites
- **Size**: Change canvas dimensions for different screen sizes

## 🌐 Browser Compatibility

This game works on all modern browsers that support HTML5 Canvas:
- Chrome
- Firefox
- Safari
- Edge
- Mobile browsers

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

---

Enjoy playing Flappy Bird! 🐦