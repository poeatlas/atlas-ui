FROM node:8-alpine

WORKDIR /usr/src/app

COPY . .

RUN rm -rf node_modules
RUN npm install
RUN npm run build