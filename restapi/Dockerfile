FROM node:16.13.1
LABEL org.opencontainers.image.source https://github.com/Arquisoft/dede_es4c
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install

ARG MONGO_DB_URI
ENV MONGO_DB=$MONGO_DB_URI
ARG JWT_SECRET
ENV SECRET=$JWT_SECRET

CMD [ "npm", "start" ]