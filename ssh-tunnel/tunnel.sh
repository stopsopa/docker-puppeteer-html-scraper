
THISFILE=${BASH_SOURCE[0]}
DIR="$( cd "$( dirname "${THISFILE}" )" && pwd -P )"

echo $DIR;

source "$DIR/config.sh"

# ssh root@$HOST -N -R 0.0.0.0:$TARGETHOSTPORT:localhost:$LOCALPORT -i ../ssh/id_rsa & disown
ssh root@$HOST -N -R 0.0.0.0:$TARGETHOSTPORT:localhost:$LOCALPORT