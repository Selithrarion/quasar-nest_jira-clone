FROM node:alpine

WORKDIR /app/backend

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

CMD [ "yarn", "start:dev" ]