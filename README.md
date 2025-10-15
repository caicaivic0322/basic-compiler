# 在线编译器

这是一个支持C++和Python的在线编译器，使用Docker进行部署。

## 功能特性

- 支持C++代码编译和执行
- 支持Python代码执行
- 语法检查功能
- 代码高亮显示
- 输入/输出支持
- 响应式设计

## 使用Docker部署

### 前提条件

- 安装Docker和Docker Compose
  - Docker安装指南: https://docs.docker.com/get-docker/
  - Docker Compose安装指南: https://docs.docker.com/compose/install/

### 一键部署（推荐）

1. 克隆项目到本地
2. 在项目根目录运行以下命令：

```bash
# 给脚本添加执行权限
chmod +x deploy.sh

# 运行一键部署脚本
./deploy.sh
```

### 手动部署

1. 克隆项目到本地
2. 在项目根目录运行以下命令：

```bash
# 构建并启动服务
docker-compose up -d --build

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

3. 访问应用：
   - 前端界面：http://localhost:8000
   - 后端API：http://localhost:3002

### 停止服务

```bash
# 使用停止脚本
./stop.sh

# 或使用Docker Compose命令
docker-compose down

# 停止并删除容器及网络、卷
docker-compose down --volumes
```

## 公网访问

### 方案一：使用ngrok（临时方案）

如果你只是想临时分享你的编译器给他人使用，可以使用ngrok：

```bash
./public-access.sh
```

这个方案：
- 优点：无需修改代码，立即可用，免费
- 缺点：URL会变化，需要保持计算机运行，有带宽限制

### 方案二：云部署（长期方案）

对于长期使用，推荐将编译器部署到云平台：

```bash
./cloud-deploy-guide.sh
```

我们提供了适用于Railway平台的完整部署方案，所有文件已准备在`railway/`目录中：

```bash
cd railway
./deploy-to-railway.sh
```

这个方案：
- 优点：永久URL，自动HTTPS，无需保持本地运行
- 缺点：需要注册云平台账号

## 健康检查

```bash
# 运行健康检查脚本
./health-check.sh
```

这将检查：
- 容器状态
- 前端和后端服务状态
- Python和C++编译API功能

## 公网访问

### 方案一：使用ngrok（快速、临时）

```bash
# 启动ngrok隧道
./public-access.sh
```

这将生成一个临时URL，您可以分享给学生使用。

### 方案二：云部署（长期、稳定）

```bash
# 查看云部署指南
./cloud-deploy-guide.sh
```

或者查看 [README-CLOUD.md](README-CLOUD.md) 获取详细的云部署说明。

## 常见问题

1. **端口被占用**
   - 检查端口8000和3002是否被其他程序占用
   - 使用`lsof -i :8000`和`lsof -i :3002`检查

2. **Docker构建失败**
   - 确保网络连接正常，需要下载依赖包
   - 尝试使用`docker-compose build --no-cache`重新构建

3. **API请求失败**
   - 检查容器是否正常运行：`docker-compose ps`
   - 查看容器日志：`docker-compose logs -f`

## 本地开发

### 安装依赖

```bash
# 安装后端依赖
npm install
```

### 启动服务

```bash
# 启动后端服务
PORT=3002 node server.js

# 在另一个终端启动前端服务
python3 -m http.server 8000
```

## 项目结构

```
.
├── css/              # CSS样式文件
├── js/               # JavaScript文件
├── temp/             # 临时文件目录
├── docker-compose.yml # Docker Compose配置
├── Dockerfile        # Docker镜像构建文件
├── nginx.conf        # Nginx配置文件
├── package.json      # Node.js依赖配置
├── server.js         # 后端服务器文件
└── index.html        # 前端入口文件
```

## API接口

### C++编译和执行

- 请求：`POST /compile/cpp`
- 请求体：
  ```json
  {
    "code": "C++代码",
    "input": "程序输入"
  }
  ```
- 响应：
  ```json
  {
    "success": true,
    "output": "程序输出"
  }
  ```

### Python执行

- 请求：`POST /compile/python`
- 请求体：
  ```json
  {
    "code": "Python代码",
    "input": "程序输入"
  }
  ```
- 响应：
  ```json
  {
    "success": true,
    "output": "程序输出"
  }
  ```

### C++语法检查

- 请求：`POST /check/cpp`
- 请求体：
  ```json
  {
    "code": "C++代码"
  }
  ```
- 响应：
  ```json
  {
    "success": true
  }
  ```

### Python语法检查

- 请求：`POST /check/python`
- 请求体：
  ```json
  {
    "code": "Python代码"
  }
  ```
- 响应：
  ```json
  {
    "success": true
  }
  ```

## 注意事项

- 程序执行有5秒的时间限制
- 临时文件会在执行完成后自动清理
- Docker容器需要安装g++和python3才能正常工作