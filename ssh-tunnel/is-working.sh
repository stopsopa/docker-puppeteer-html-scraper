#!/bin/bash

set -e

set -o xtrace

THISFILE=${BASH_SOURCE[0]}
DIR="$( cd "$( dirname "${THISFILE}" )" && pwd -P )"

echo $DIR;

source "$DIR/.env"

LIST="$(ps aux | grep $FLAG | grep -v grep)"

PIDS=$(echo -e "$LIST" | awk '{print $2}');

if [ "$PIDS" == "" ]; then

    exit 1;
fi