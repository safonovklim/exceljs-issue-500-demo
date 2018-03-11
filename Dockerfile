FROM node:8.9.4

RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get install -y --no-install-recommends apt-utils
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y -q python make g++ libldap2-dev postgresql

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN npm install -s -g yarn@1.3.2

# handle npm_modules first to allow docker build caching
WORKDIR  /usr/src/modules
ADD package.json /usr/src/modules/package.json
RUN yarn

# Bundle app source
WORKDIR  /usr/src/app
ADD . /usr/src/app
RUN rm -rf ./node_modules
RUN ln -sf /usr/src/modules/node_modules .
RUN npm run build
