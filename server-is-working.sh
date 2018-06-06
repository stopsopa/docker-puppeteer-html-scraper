#!/bin/bash

# set -o xtrace
# set -e

FLAG=$1
THISFILE="$(basename $0)"

trim() {
    local var="$*"
    # remove leading whitespace characters
    var="${var#"${var%%[![:space:]]*}"}"
    # remove trailing whitespace characters
    var="${var%"${var##*[![:space:]]}"}"
    echo -n "$var"
}

if [ "$#" == 0 ] ; then

      echo "give flag parameter"

      exit 1

else

    COUNT="$(ps aux | grep $FLAG | grep -v grep | grep -v "$THISFILE" | wc -l)"

    COUNT="$(trim "$COUNT")"

    echo ">>$COUNT<<"

    if [ "$COUNT" != "1" ]; then

        exit 1
    fi
fi

