
THISFILE=${BASH_SOURCE[0]}
DIR="$( cd "$( dirname "${THISFILE}" )" && pwd -P )"

echo $DIR;

source "$DIR/.env"

# ssh root@$HOST -N -R 0.0.0.0:$TARGETHOSTPORT:localhost:$LOCALPORT -i ../ssh/id_rsa & disown
ssh root@$HOST -N -R $TARGETHOSTPORT:localhost:$LOCALPORT -v