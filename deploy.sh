#!/bin/bash

server="$1"

yarn build --prod

scp -r package.json yarn.lock .yarnrc dist  "$server":~/app
