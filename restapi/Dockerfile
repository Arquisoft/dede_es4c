FROM node:16.13.1
LABEL org.opencontainers.image.source https://github.com/Arquisoft/dede_es4c
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install

ENV RESTAPI_DB_URI=$MONGO_DB_URL

CMD [ "npm", "start" ]