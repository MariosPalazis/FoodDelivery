FROM node:19.6.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 9000

CMD ["npm", "start"]