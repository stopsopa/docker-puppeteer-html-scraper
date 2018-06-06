FLAG := "html-scraper-server"

ensure: stop
	/bin/bash ensure.sh ${FLAG} & disown

start: stop
	node proxy-server.js ${FLAG} & disown

stop:
	/bin/bash kill.sh ${FLAG} ensure.sh

