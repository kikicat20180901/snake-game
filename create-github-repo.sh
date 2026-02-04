#!/bin/bash
# 使用GitHub API创建仓库
read -p "请输入GitHub用户名: " username
read -s -p "请输入GitHub密码或token: " token
echo

curl -X POST \\
  -u "$username:$token" \\
  -H "Accept: application/vnd.github.v3+json" \\
  https://api.github.com/user/repos \\
  -d "{\\"name\\":\\"snake-game\\",\\"description\\":\\"A complete vanilla HTML Snake Game with multiple difficulty levels and responsive design\\",\\"private\\":false,\\"auto_init\\":true}"

echo -e "\\n✅ 仓库创建完成！现在可以推送代码了。"
echo "运行: cd /root/clawd/snake-game-deploy && git push -u origin master"
