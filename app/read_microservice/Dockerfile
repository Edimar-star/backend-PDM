FROM node:18

WORKDIR /read_microservice

COPY package.json .
RUN npm install

COPY . .
CMD npm start