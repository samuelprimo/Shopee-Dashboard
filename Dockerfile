FROM node:latest

WORKDIR /usr/src/app

COPY . ./

RUN npm install

RUN npm install -g serve

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["serve", "-s", "build"]