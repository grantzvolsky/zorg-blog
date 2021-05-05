#!/bin/bash

set -euo pipefail

docker load <$(nix-build image-interactive.nix --no-sandbox)

printf '\nRun the below command to start a local container\n'
printf 'docker run --rm -it --net=host --workdir $(pwd) -v $(pwd):$(pwd) zorg-blog:latest bash\n'
