#!/bin/bash

# 在线编译器Docker一键部署脚本

echo "===== 在线编译器Docker一键部署 ====="

# 检查Docker是否安装
if ! command -v docker &> /dev/null; then
    echo "错误: Docker未安装，请先安装Docker"
    echo "安装指南: https://docs.docker.com/get-docker/"
    exit 1
fi

# 检查Docker Compose是否安装
if ! command -v docker-compose &> /dev/null; then
    echo "错误: Docker Compose未安装，请先安装Docker Compose"
    echo "安装指南: https://docs.docker.com/compose/install/"
    exit 1
fi

# 停止并删除现有容器
echo "停止并删除现有容器..."
docker-compose down

# 构建并启动服务
echo "构建并启动服务..."
docker-compose up -d --build

# 等待服务启动
echo "等待服务启动..."
sleep 10

# 检查服务状态
echo "检查服务状态..."
docker-compose ps

# 测试API
echo "测试Python API..."
python_response=$(curl -s -X POST -H "Content-Type: application/json" -d '{"code":"print(\"Hello from Python!\")","input":""}' http://localhost:3002/compile/python)
if [[ $python_response == *"success":true* ]]; then
    echo "✓ Python API测试成功"
else
    echo "✗ Python API测试失败"
fi

echo "测试C++ API..."
cpp_response=$(curl -s -X POST -H "Content-Type: application/json" -d '{"code":"#include <iostream>\nint main() { std::cout << \"Hello from C++!\" << std::endl; return 0; }","input":""}' http://localhost:3002/compile/cpp)
if [[ $cpp_response == *"success":true* ]]; then
    echo "✓ C++ API测试成功"
else
    echo "✗ C++ API测试失败"
fi

# 显示访问信息
echo ""
echo "===== 部署完成 ====="
echo "前端界面: http://localhost:8000"
echo "后端API: http://localhost:3002"
echo ""
echo "查看日志: docker-compose logs -f"
echo "停止服务: ./stop.sh 或 docker-compose down"
echo ""
echo "如果遇到问题，请检查:"
echo "1. 端口8000和3002是否被占用"
echo "2. Docker和Docker Compose是否正确安装"
echo "3. 防火墙设置是否阻止了端口访问"