# GitHub Pages启用指南 - 解决Actions部署问题

## 🎯 问题原因
GitHub Actions工作流失败是因为Pages设置不正确。需要手动将部署源改为"GitHub Actions"。

## ✅ 解决步骤（1分钟完成）：

### 步骤1: 访问设置页面
打开浏览器，访问：
https://github.com/kikicat20180901/snake-game/settings/pages

### 步骤2: 更改部署源
在 "Build and deployment" > "Source" 部分：
- ❌ 当前："Deploy from a branch" 
- ✅ 改为："GitHub Actions" （选择这个）

### 步骤3: 保存设置
点击 "Save" 按钮

### 步骤4: 重新运行工作流
1. 访问：https://github.com/kikicat20180901/snake-game/actions
2. 找到失败的工作流运行
3. 点击 "Re-run jobs" 按钮

### 步骤5: 等待完成
- 工作流将重新运行（约1-2分钟）
- 状态从 🔄 变为 ✅ 

## 🌐 游戏链接
完成后，你的贪吃蛇游戏将在：
https://kikicat20180901.github.io/snake-game/

## 📱 验证成功
- Actions页面显示绿色✅ 
- Settings > Pages 显示 "Your site is live at ..."
- 点击链接即可玩游戏！

## 🎮 游戏特色
- 4种难度等级
- 响应式设计，支持手机
- 触摸和键盘控制
- 分数记录系统

**只需要这最后一步，你的贪吃蛇游戏就能上线了！** 🚀