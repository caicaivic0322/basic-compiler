#!/bin/bash

# 在线编译器Docker停止脚本

echo "===== 停止在线编译器服务 ====="

# 停止并删除容器
echo "停止并删除容器..."
docker-compose down

# 停止并删除容器及网络、卷
echo "停止并删除容器及网络、卷..."
docker-compose down --volumes

echo "===== 服务已停止 ====="