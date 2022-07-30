#! /bin/bash
docker_compose_file=docker/docker-compose.yml

if [ "$1" == "--clean" ]; then
  docker-compose --project-name crypto_payments_bot --file $docker_compose_file down -v
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

image_name="$repo_name:tests"

docker rm -f "test-$name" > /dev/null 2>&1
./scripts/build.sh test
docker-compose --project-name crypto_payments_bot --file $docker_compose_file --profile test run --rm \
  --volume=`pwd`:/app \
  --name="test-$name" \
  tests $@