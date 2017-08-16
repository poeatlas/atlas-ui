FROM node:8-alpine

WORKDIR /usr/src/app

COPY . .

RUN rm -rf node_modules build
RUN npm install -g create-react-app
RUN npm install
RUN npm run build