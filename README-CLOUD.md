# C++和Python在线编译器 - 云部署版

这是一个支持C++和Python代码在线编译和执行的Web应用程序，已优化用于云部署。

## 云部署选项

### 1. Railway部署（推荐）

[Railway](https://railway.app) 是一个简单易用的云平台，非常适合部署Node.js应用。

#### 步骤：

1. **准备代码**
   ```bash
   # 将项目推送到GitHub
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **在Railway上部署**
   - 访问 [Railway](https://railway.app) 并注册账户
   - 点击 "New Project" -> "Deploy from GitHub repo"
   - 选择您的GitHub仓库
   - Railway会自动检测Node.js项目并部署
   - 部署完成后，您将获得一个永久URL

3. **配置环境变量**（可选）
   - 在Railway项目设置中，您可以添加环境变量
   - 例如：`NODE_ENV=production`

### 2. Vercel部署（前端）+ Railway部署（后端）

如果您想将前端和后端分开部署：

1. **前端部署到Vercel**
   - 访问 [Vercel](https://vercel.com) 并注册账户
   - 连接GitHub仓库
   - Vercel会自动部署静态前端

2. **后端部署到Railway**
   - 按照上述步骤部署后端
   - 修改前端代码中的API URL为Railway提供的URL

### 3. 使用ngrok（临时解决方案）

如果您只需要临时分享：

```bash
# 运行本地服务
./deploy.sh

# 启动ngrok
./public-access.sh
```

### 4. 自己的云服务器

如果您有自己的云服务器：

```bash
# 安装Docker和Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 安装Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 克隆项目
git clone https://github.com/yourusername/your-repo.git
cd your-repo

# 部署
./deploy.sh
```

## 项目结构

```
├── backend/
│   ├── server.js          # 后端服务器
│   ├── package.json       # Node.js依赖
│   └── routes/
│       └── compile.js     # 编译API路由
├── frontend/
│   ├── index.html         # 前端页面
│   ├── css/
│   │   └── style.css      # 样式文件
│   └── js/
│       └── script.js      # 前端脚本
├── nginx.conf             # Nginx配置
├── docker-compose.yml     # Docker Compose配置
├── Dockerfile             # 后端Docker镜像
├── Dockerfile.cloud       # 云部署优化Docker镜像
├── package-cloud.json     # 云部署优化package.json
├── deploy.sh              # 一键部署脚本
├── public-access.sh       # ngrok公网访问脚本
├── health-check.sh        # 健康检查脚本
└── README.md              # 项目文档
```

## 功能特点

- 支持C++代码编译和执行
- 支持Python代码执行
- 现代化的用户界面
- 实时编译和结果显示
- 响应式设计，适配各种设备

## 技术栈

- 后端：Node.js, Express
- 前端：HTML, CSS, JavaScript
- 容器化：Docker, Docker Compose
- 反向代理：Nginx

## 许可证

MIT License