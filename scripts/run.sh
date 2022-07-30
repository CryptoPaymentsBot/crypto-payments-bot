#! /bin/bash
docker_compose_file=docker/docker-compose.yml

if [ "$1" == "--clean" ]; then
  docker-compose --project-name crypto_payments_bot --file $docker_compose_file down -v --remove-orphans
  exit
fi

set -a
. ./scripts/config.sh

# Are we running inside a terminal or on CI?
if [ -t 1 ]; then
    INTERACTIVE_FLAG="-it"
else
    INTERACTIVE_FLAG=""
fi

./scripts/build.sh
image_name="$repo_name:latest"

docker-compose --project-name crypto_payments_bot --file $docker_compose_file up
