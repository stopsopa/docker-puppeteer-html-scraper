set -o xtrace

id

make isworking 2>&1

STATUS="$?";

echo "is working status: $STATUS";

if [ "$STATUS" != "0" ]; then

    echo 'attempt to start';

    make start 2>&1
fi

make isworking 2>&1

STATUS="$?";

echo "is working status: $STATUS";

echo 'end...';