# 使用Node.js官方镜像作为基础镜像
FROM node:16-alpine

# 安装必要的包
RUN apk add --no-cache g++ python3 make

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目文件
COPY . .

# 创建临时目录用于存放编译的代码
RUN mkdir -p temp

# 暴露端口
EXPOSE 3002

# 启动服务器
CMD ["node", "server.js"]