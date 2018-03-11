FROM node:6.13.1

RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get install -y --no-install-recommends apt-utils
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y -q python make g++ libldap2-dev postgresql

RUN npm install -s -g yarn@1.3.2

WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
RUN yarn
RUN yarn global add sequelize-cli

WORKDIR /usr/src/app/
