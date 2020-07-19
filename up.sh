#!/bin/sh
export UID=$(id -u)
export GID=$(id -g)
docker-compose up -d --build
docker exec -it node /bin/bash
