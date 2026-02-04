#!/bin/bash
# GitHub Pages启用脚本

echo "🚀 正在启用GitHub Pages..."

# 检查仓库状态
REPO="kikicat20180901/snake-game"
echo "📊 仓库: $REPO"

# 尝试通过API启用Pages（需要有效token）
echo "正在尝试自动启用Pages..."
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/$REPO/pages" \
  -d '{
    "source": {
      "branch": "master",
      "path": "/"
    }
  }'

echo -e "\n✅ 如果看到错误，请手动完成以下步骤："
echo "1. 访问: https://github.com/$REPO/settings/pages"
echo "2. 选择: Deploy from a branch"
echo "3. 分支: master"
echo "4. 路径: / (root)"
echo "5. 点击: Save"
echo ""
echo "🌐 游戏链接将是: https://kikicat20180901.github.io/snake-game/"