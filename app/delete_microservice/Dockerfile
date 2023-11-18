FROM node:18

WORKDIR /delete_microservice

COPY package.json .
RUN npm install

COPY . .
CMD npm start