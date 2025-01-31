#!/bin/bash

FILE_PATH=$(cd "$(dirname "$0")"; pwd)

deno run -W -R  $FILE_PATH/OnIconModified.ts "$@"