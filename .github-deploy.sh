#!/bin/bash
# 需要你的GitHub Personal Access Token
# 创建token: https://github.com/settings/tokens/new (勾选repo权限)

read -sp 'GitHub Personal Access Token: ' GITHUB_TOKEN
echo
read -p 'GitHub Username: ' GITHUB_USER

# 创建仓库
curl -H "Authorization: token $GITHUB_TOKEN"      -H "Accept: application/vnd.github.v3+json"      https://api.github.com/user/repos      -d '{"name":"crypto-price-tracker","description":"🪙 Real-time cryptocurrency price tracker","private":false}'

# 推送代码
git remote add origin https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com/${GITHUB_USER}/crypto-price-tracker.git
git push -u origin main

# 启用GitHub Pages
curl -X PUT      -H "Authorization: token $GITHUB_TOKEN"      -H "Accept: application/vnd.github.v3+json"      https://api.github.com/repos/${GITHUB_USER}/crypto-price-tracker/pages      -d '{"source":{"branch":"main","path":"/"}}'

echo ""
echo "✅ 部署完成！"
echo "访问地址: https://${GITHUB_USER}.github.io/crypto-price-tracker/"
