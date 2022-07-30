#!/bin/bash
name=`node -e "console.log(require('./package.json').name)"`
tag=`node -e "console.log(require('./package.json').version)"`
repo_name="crypto-payments-bot"