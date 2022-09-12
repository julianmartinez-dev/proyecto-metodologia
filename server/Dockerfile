FROM node:14-alpine

COPY ["package.json", "package-lock.json", "/usr/src/service/server/"]

WORKDIR /usr/src/service/server

RUN npm install

COPY [".", "/usr/src/service/server/"]

CMD ["yarn", "start"]
