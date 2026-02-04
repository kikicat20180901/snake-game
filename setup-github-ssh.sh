#!/bin/bash
# GitHub SSH设置脚本

echo "🔑 正在设置GitHub SSH认证..."

# 检查SSH密钥是否存在
if [ ! -f ~/.ssh/id_ed25519 ]; then
    echo "生成新的SSH密钥..."
    ssh-keygen -t ed25519 -C "kikicat20180901@github.com" -f ~/.ssh/id_ed25519 -N ""
fi

# 启动SSH代理
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# 创建SSH配置
cat > ~/.ssh/config << EOF
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519
    IdentitiesOnly yes
EOF

chmod 600 ~/.ssh/config

echo "✅ SSH密钥已生成！"
echo "📋 你的公钥是："
cat ~/.ssh/id_ed25519.pub
echo ""
echo "📝 请按以下步骤操作："
echo "1. 复制上面的公钥"
echo "2. 访问 https://github.com/settings/ssh/new"
echo "3. 粘贴公钥并保存"
echo "4. 然后运行：git push -u origin master"