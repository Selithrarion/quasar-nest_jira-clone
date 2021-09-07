FROM node:alpine

WORKDIR /app/frontend

COPY ./package.json ./
COPY ./yarn.lock ./

RUN echo pwd
RUN yarn global add @quasar/cli
RUN yarn install

COPY . .

CMD [ "quasar", "dev" ]
