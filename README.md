# 🐍 贪吃蛇游戏 - 部署说明

这是一个使用纯 HTML、CSS 和 JavaScript 开发的贪吃蛇游戏，可以直接部署到任何静态网站托管服务。

## 🚀 快速部署方法

### 方法1：GitHub Pages 部署（推荐）

1. **Fork 或下载此项目**
   ```bash
   git clone https://github.com/yourusername/snake-game-vanilla.git
   cd snake-game-vanilla
   ```

2. **上传到 GitHub**
   - 在 GitHub 创建新仓库
   - 推送代码到仓库

3. **启用 GitHub Pages**
   - 进入仓库 Settings
   - 找到 Pages 设置
   - 选择 Source 为 "Deploy from a branch"
   - 选择主分支和根目录
   - 点击 Save

4. **访问游戏**
   - 等待几分钟后，访问 `https://yourusername.github.io/snake-game-vanilla`

### 方法2：Netlify 部署

1. **拖拽部署**
   - 访问 [netlify.com](https://netlify.com)
   - 拖拽项目文件夹到部署区域
   - 自动获得可访问的URL

### 方法3：Vercel 部署

1. **连接 GitHub 仓库**
   - 访问 [vercel.com](https://vercel.com)
   - 导入 GitHub 仓库
   - 一键部署

## 📁 文件结构

```
snake-game-vanilla/
├── index.html      # 主页面
├── style.css       # 样式文件
├── script.js       # 游戏逻辑
└── README.md       # 部署说明
```

## 🎮 游戏特色

- **纯前端实现**：无需后端服务器
- **响应式设计**：支持桌面和移动设备
- **触摸控制**：支持手机滑动操作
- **本地存储**：自动保存最高分记录
- **多难度等级**：简单、中等、困难、极限
- **可配置网格**：15x15 到 30x30 多种尺寸
- **现代UI设计**：渐变背景、动画效果

## ⚙️ 本地运行

如果你想要在本地运行游戏：

1. **直接打开**：双击 `index.html` 文件即可在浏览器中运行
2. **本地服务器**（推荐）：
   ```bash
   # 使用 Python
   python -m http.server 8000
   
   # 或使用 Node.js
   npx serve .
   
   # 或使用 Live Server (VS Code 插件)
   ```

## 🎯 游戏控制

- **桌面端**：
  - 方向键：↑ ↓ ← → 控制移动
  - 空格键：暂停/继续
  - R键：重新开始

- **移动端**：
  - 滑动屏幕控制蛇的移动方向
  - 点击按钮进行暂停/继续操作

## 🛠️ 自定义配置

你可以在 `script.js` 中修改以下配置：

```javascript
// 游戏速度设置
this.difficultySettings = {
    easy: { speed: 200, scoreMultiplier: 1 },
    medium: { speed: 150, scoreMultiplier: 1.2 },
    hard: { speed: 100, scoreMultiplier: 1.5 },
    extreme: { speed: 70, scoreMultiplier: 2 }
};

// 画布大小
this.canvas.width = 600;
this.canvas.height = 600;

// 网格大小
this.gridSize = 20;
```

## 📱 移动端优化

游戏已经针对移动设备进行了优化：
- 响应式布局适配不同屏幕尺寸
- 触摸滑动控制
- 大按钮设计便于触摸操作
- 自适应字体大小

## 🌐 浏览器兼容性

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+
- ✅ 移动端浏览器

## 🚀 高级部署选项

### 自定义域名
- GitHub Pages 支持自定义域名
- Netlify 和 Vercel 也支持自定义域名配置

### CDN 加速
- 可以将静态资源上传到 CDN 提高加载速度
- 建议压缩 CSS 和 JavaScript 文件

### PWA 支持
可以添加以下功能使其成为渐进式Web应用：
- Web App Manifest
- Service Worker
- 离线支持

## 🎨 主题定制

游戏支持多种视觉定制：
- 在 `style.css` 中修改颜色方案
- 调整动画效果
- 更换字体
- 修改布局结构

## 📊 性能优化

- 使用 Canvas 2D 渲染，性能优秀
- 游戏循环使用 `setInterval` 优化
- 本地存储减少重复计算
- 触摸事件优化移动体验

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进游戏！

## 📄 许可证

MIT License - 可自由使用和修改

---

**🎮 祝你玩得愉快！** 部署完成后记得分享你的游戏链接给朋友哦！