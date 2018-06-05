FROM node:8.11.1-alpine

RUN mkdir /test-node-auth

WORKDIR /test-node-auth

COPY package*.json ./

RUN npm install

COPY . .


