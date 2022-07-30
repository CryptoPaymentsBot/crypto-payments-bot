#!/bin/bash
docker_compose_file=docker/docker-compose.yml

. ./scripts/config.sh

if [ "$1" ]; then
  target="$1"
else
  target="prod"
fi

if [ "$target" == "prod" ]; then
  tags="--tag $repo_name:latest --tag $repo_name:$tag"
elif [ "$target" == "test" ]; then
  tags="--tag $repo_name:tests"
fi


DOCKER_BUILDKIT=1 \
docker build \
  --build-arg VERSION="${VERSION}" \
  $tags \
  --file docker/Dockerfile \
  --target $target \
  .