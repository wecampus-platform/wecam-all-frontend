#!/bin/bash

IMAGE_NAME="wecam-frontend"
CONTAINER_NAME="wecam-frontend-container"

echo "🔄 이미지 빌드 중..."
docker build -t $IMAGE_NAME .

echo "🧼 기존 컨테이너 정리 중..."
docker stop $CONTAINER_NAME 2>/dev/null && docker rm $CONTAINER_NAME 2>/dev/null

echo "🚀 컨테이너 실행 중..."
docker run -d --name $CONTAINER_NAME -p 3000:3000 $IMAGE_NAME

echo "✅ http://localhost:3000 에서 접속 가능!"