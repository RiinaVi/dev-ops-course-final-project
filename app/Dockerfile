FROM node:20.11.1

WORKDIR /
COPY package.json ./

RUN npm install -g tsc
RUN npm install
COPY . .
RUN npm run build
