#!/usr/bin/env bash

export ENV_FILE=.env

DOCKER_COMPOSE="docker-compose
--project-name issue500demo
-f docker-compose.yml
-f docker-compose.dev.yml
-f docker-compose.local.yml
-f docker-compose.logs.yml"

$DOCKER_COMPOSE build

if [ "$1" = "seed" ] ; then
    $DOCKER_COMPOSE run --service-ports runner npm run db:seed
fi

$DOCKER_COMPOSE run --service-ports runner bash

$DOCKER_COMPOSE down
