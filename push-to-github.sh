#!/bin/bash
echo "请在GitHub创建好仓库后，输入你的GitHub用户名:"
read -p "GitHub username: " username

cd /root/02-product/crypto-price-tracker
git branch -M main
git remote add origin https://github.com/${username}/crypto-price-tracker.git
git push -u origin main

echo ""
echo "✅ 代码推送成功！"
echo ""
echo "下一步: 配置GitHub Pages"
echo "1. 访问 https://github.com/${username}/crypto-price-tracker/settings/pages"
echo "2. Source 选择 'GitHub Actions'"
echo "3. 等待1-2分钟自动部署"
echo "4. 访问 https://${username}.github.io/crypto-price-tracker/"
