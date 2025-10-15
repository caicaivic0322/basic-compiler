#!/bin/bash

# 在线编译器健康检查脚本

echo "===== 在线编译器健康检查 ====="

# 检查容器状态
echo "检查容器状态..."
docker-compose ps

# 检查前端服务
echo ""
echo "检查前端服务..."
frontend_status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000)
if [ $frontend_status -eq 200 ]; then
    echo "✓ 前端服务正常 (HTTP $frontend_status)"
else
    echo "✗ 前端服务异常 (HTTP $frontend_status)"
fi

# 检查后端服务
echo "检查后端服务..."
backend_status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3002)
if [ $backend_status -eq 404 ]; then
    echo "✓ 后端服务正常 (HTTP $backend_status)"
else
    echo "✗ 后端服务异常 (HTTP $backend_status)"
fi

# 测试Python API
echo ""
echo "测试Python API..."
python_response=$(curl -s -X POST -H "Content-Type: application/json" -d '{"code":"print(\"Hello from Python!\")","input":""}' http://localhost:3002/compile/python)
if [[ $python_response == *"\"success\":true"* ]]; then
    echo "✓ Python API测试成功"
    echo "  响应: $python_response"
else
    echo "✗ Python API测试失败"
    echo "  响应: $python_response"
fi

# 测试C++ API
echo ""
echo "测试C++ API..."
cpp_response=$(curl -s -X POST -H "Content-Type: application/json" -d '{"code":"#include <iostream>\nint main() { std::cout << \"Hello from C++!\" << std::endl; return 0; }","input":""}' http://localhost:3002/compile/cpp)
if [[ $cpp_response == *"\"success\":true"* ]]; then
    echo "✓ C++ API测试成功"
    echo "  响应: $cpp_response"
else
    echo "✗ C++ API测试失败"
    echo "  响应: $cpp_response"
fi

echo ""
echo "===== 健康检查完成 ====="