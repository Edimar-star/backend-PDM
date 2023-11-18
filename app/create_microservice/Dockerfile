FROM node:18

WORKDIR /create_microservice

COPY package.json .
RUN npm install

COPY . .
CMD npm start