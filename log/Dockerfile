FROM node:18

WORKDIR /log
COPY package.json .
RUN npm install

COPY . .
CMD npm start