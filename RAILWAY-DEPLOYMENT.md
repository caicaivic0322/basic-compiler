# Railway部署指南

本指南将帮助你将C++/Python在线编译器部署到Railway平台。

## 快速开始

### 方法1：使用部署脚本（推荐）

1. 进入railway目录：
   ```bash
   cd railway
   ```

2. 运行部署脚本：
   ```bash
   ./deploy-to-railway.sh
   ```

3. 按照提示完成部署

### 方法2：手动部署

1. **安装Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **登录Railway**
   ```bash
   railway login
   ```

3. **初始化项目**
   ```bash
   railway init
   ```

4. **部署**
   ```bash
   railway up
   ```

### 方法3：通过GitHub部署

1. 将代码推送到GitHub仓库
2. 在Railway控制台中连接GitHub仓库
3. 自动部署

## 部署后

部署完成后，你将获得一个永久URL，可以通过该URL访问你的在线编译器。

## 注意事项

- 确保你有Railway账号
- 免费版有限制，但足够个人使用
- 部署可能需要几分钟时间

## 故障排除

如果遇到问题，请查看Railway控制台中的日志。