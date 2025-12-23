# Playwright가 포함된 공식 이미지 사용
FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 브라우저 설치 명령어 명시
RUN npx playwright install chromium

EXPOSE 3000
CMD ["npm", "start"]