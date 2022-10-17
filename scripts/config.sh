#!/bin/bash
name=`node -e "console.log(require('./package.json').name)"`
tag=`node -e "console.log(require('./package.json').version)"`
repo_name="crypto-payments-bot"

DATABASE_URL="postgresql://postgres:postgres@postgres:5432/debug"
REDIS_URL="redis://redis:6379/0"