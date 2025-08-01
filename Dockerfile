FROM node:18-alpine

# 앱 작업 디렉토리 생성
WORKDIR /app

# 패키지 복사 및 설치
COPY package.json package-lock.json* ./
RUN npm install

# 전체 소스 복사
COPY . .

# 개발 서버 실행 (next dev)
EXPOSE 3000
CMD ["npm", "run", "dev"]