set -o xtrace

make isworking

STATUS="$?";

echo "is working status: $STATUS";

if [ "$STATUS" != "0" ]; then

    echo 'attempt to start';

    make start
fi

make isworking

STATUS="$?";

echo "is working status: $STATUS";

echo 'end...';