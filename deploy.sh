#!/usr/bin/env bash

set -euo pipefail

if [ -z "$(git status --porcelain)" ]; then
  VERSION=$(git rev-parse HEAD)
  docker run --rm -it --net=host --workdir $(pwd)/spa -v $(pwd):$(pwd) zorg-blog:latest npm run build
  tar -cvf $VERSION.tar spa/build
  scp ./$VERSION.tar blog@zvolsky.org:~/$VERSION.tar
  ssh root@zvolsky.org 'tar -C /var/www/html --strip-components=2 -xvf /home/blog/'$VERSION'.tar spa/build'
else
  echo 'Refusing to deploy an unclean repository. See `git status`.'
  exit 1
fi
