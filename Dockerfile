FROM node:carbon

# 앱 디렉터리 생성
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# 앱 소스 추가
COPY docker /usr/src/app
COPY server /usr/src/app

# 앱 의존성 설치
RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]