FROM node:16.3.0-stretch
ENV APP_ROOT /src/

WORKDIR $APP_ROOT

COPY ./src/redis/package*.json $APP_ROOT
RUN npm install

COPY ./src/redis/ $APP_ROOT