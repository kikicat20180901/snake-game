#!/bin/bash
# GitHub一键推送脚本

echo "🚀 开始推送到GitHub..."

# 检查仓库是否存在
if ! git ls-remote git@github.com:kikicat20180901/snake-game.git > /dev/null 2>&1; then
    echo "❌ 远程仓库不存在，请先创建仓库："
    echo "   访问: https://github.com/new"
    echo "   仓库名: snake-game"
    echo "   然后重新运行这个脚本"
    exit 1
fi

# 推送代码
echo "📤 正在推送代码..."
git push -u origin master

if [ $? -eq 0 ]; then
    echo "✅ 推送成功！"
    echo "🌐 GitHub仓库: https://github.com/kikicat20180901/snake-game"
    echo "📱 启用GitHub Pages: Settings → Pages → Source: Deploy from a branch"
    echo "🎮 游戏链接将是: https://kikicat20180901.github.io/snake-game/"
else
    echo "❌ 推送失败，请检查SSH密钥设置"
fi