#!/bin/bash

# 使用ngrok公开在线编译器脚本

echo "===== 在线编译器公网访问设置 ====="

# 检查ngrok是否已安装
if ! command -v ngrok &> /dev/null; then
    echo "ngrok未安装，正在安装..."
    
    # 检查操作系统
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            brew install ngrok/ngrok/ngrok
        else
            echo "请先安装Homebrew，然后运行: brew install ngrok/ngrok/ngrok"
            exit 1
        fi
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null
        echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list
        sudo apt update && sudo apt install ngrok
    else
        echo "不支持的操作系统，请手动安装ngrok: https://ngrok.com/download"
        exit 1
    fi
fi

# 检查Docker容器是否运行
echo "检查Docker容器状态..."
if ! docker-compose ps | grep -q "Up"; then
    echo "Docker容器未运行，正在启动..."
    docker-compose up -d
    sleep 5
fi

# 获取ngrok认证令牌
echo ""
echo "===== ngrok设置 ====="
echo "如果您已有ngrok账户，请输入您的authtoken（可选，提供更稳定的连接）"
echo "您可以在 https://dashboard.ngrok.com/get-started/your-authtoken 获取"
read -p "输入ngrok authtoken（直接回车跳过）: " authtoken

if [ ! -z "$authtoken" ]; then
    ngrok config add-authtoken $authtoken
fi

# 启动ngrok隧道
echo ""
echo "正在启动ngrok隧道..."
echo "这将把本地端口8000（前端）暴露到公网"

# 启动ngrok并保存URL
ngrok http 8000 --log=stdout > ngrok.log &
NGROK_PID=$!

# 等待ngrok启动
echo "等待ngrok启动..."
sleep 10

# 获取公网URL
PUBLIC_URL=$(curl -s http://localhost:4040/api/tunnels | grep -o 'https://[^"]*' | head -1)

if [ -z "$PUBLIC_URL" ]; then
    echo "无法获取ngrok URL，请检查ngrok日志:"
    cat ngrok.log
    kill $NGROK_PID
    exit 1
fi

echo ""
echo "===== 成功！ ====="
echo "您的在线编译器现在可以通过以下URL访问:"
echo $PUBLIC_URL
echo ""
echo "请将此URL分享给您的学生"
echo ""
echo "注意: 这是临时URL，ngrok免费版本每次重启都会变化"
echo "要停止服务，请按Ctrl+C或运行: pkill ngrok"
echo ""

# 保持脚本运行，直到用户中断
trap "echo '正在停止ngrok...'; kill $NGROK_PID; exit" INT
echo "按Ctrl+C停止ngrok服务"
while true; do
    sleep 1
done