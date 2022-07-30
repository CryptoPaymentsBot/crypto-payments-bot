#! /bin/bash
docker_compose_file=docker/docker-compose.yml

if [ "$1" == "--clean" ]; then
  docker-compose --project-name crypto_payments_bot --file $docker_compose_file down -v
  exit
fi

set -a
. ./scripts/config.sh

./scripts/build.sh

image_name="$repo_name:latest"

docker-compose --project-name crypto_payments_bot --file $docker_compose_file exec $1 sh