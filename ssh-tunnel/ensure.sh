
THISFILE=${BASH_SOURCE[0]}
DIR="$( cd "$( dirname "${THISFILE}" )" && pwd -P )"

echo $DIR;

source "$DIR/.env"

if [ $# -lt 1 ] ; then

    cat << END

    run this script like:
        /bin/bash $0 $FLAG

END

    exit 0;
fi

PID="$$"

/bin/bash kill.sh $FLAG $PID node

function loop {

    # echo "pid: $PID";

    # ps aux | grep bash

    FIND=$(ps aux | grep $FLAG | grep node);

    # echo "find >>>$FIND<<<"

    PIDS=$(echo -e "$FIND" | awk '{print $2}');

    # echo ">>>$PIDS<<<"

    if [ "$PIDS" == "" ]; then

        echo 'no process - make start'

        make start
    else
        echo 'still working'
    fi
}

while true; do loop; sleep 30; done & disown;

