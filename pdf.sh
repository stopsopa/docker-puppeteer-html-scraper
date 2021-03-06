
set -e

STDIN=$(cat -)

URL=$1

source config.sh

if [ $# -lt 1 ] ; then

cat << EOF

Provide at least one argument (url), like:

    /bin/bash $0 \"http://google.com\"

You can also specify output file name:

    /bin/bash $0 \"http://google.com\" html.html

    default is "$TMPFILE"

Full examples:

    /bin/bash pdf.sh "https://www.google.com/search?ncr=&q=puppeteer"

    /bin/bash pdf.sh "https://www.google.com/search?ncr=&q=puppeteer" html.html

EOF

    exit 1;
fi

if [ ! $# -lt 2 ] ; then

    TMPFILE="$2"
fi

URLMATCH="^https?://.*"

if [[ $URL =~ $URLMATCH ]]; then

    true
else

    echo "$URL is not valid url";

    exit 1;
fi

# export SCRIPT=$(cat <<END
# docker build -t $DOCKERIMAGE . 2>&1
# END
# );

# set +e
# OUTPUT=$(eval $SCRIPT 2>&1);
# STATUS="$?"
# set -e

# if [ "$STATUS" != "0" ]; then
#
#     echo -e "for url: 'build process failed code:$STATUS\nstdout:>>>>$OUTPUT<<<\n\n"
#
#     exit 1
# fi

rm -rf $TMPFILE;

export SCRIPT=$(cat <<END
docker run \
    --env P_URL="$URL" \
    --env P_TMPFILE="$TMPFILE" \
    --env P_JSON="$STDIN" \
    -t \
    --rm \
    --cap-add=SYS_ADMIN \
    -v $(pwd):/app/app \
    $DOCKERIMAGE \
    node -e "\$(cat script.js)" 2>&1
END
);


printf "\n\n\n    vvvvv\n\n"
cat <<END
    rm -rf html.html && docker run -it --cap-add=SYS_ADMIN -v \$(pwd)/script.js:/script.js -v \$(pwd):/app/app $DOCKERIMAGE bash

    export P_URL="$URL"
    export P_TMPFILE="$TMPFILE"
    export P_JSON="$STDIN"
    node script.js
END
printf "\n    ^^^^^\n\n"

printf "\n"

echo $SCRIPT;

printf "\n"

set +e
OUTPUT=$(eval $SCRIPT 2>&1);
STATUS="$?"
set -e

if [ "$STATUS" != "0" ]; then

    echo -e "for url: '$URL' receive process code != 0\nprocess code:$STATUS\nstdout:>>>>$OUTPUT<<<\n\n"

    exit $STATUS
fi

if [ ! -f $TMPFILE ]; then

    echo "file '$TMPFILE' was not created for url '$URL'"

    echo "OUTPUT: >>>$OUTPUT<<<"
    
    exit 1
fi

echo -e "$(date +"%Y-%m-%d %H:%M:%S"): file '$TMPFILE' generated for url '$URL' - script didn't crashed";

