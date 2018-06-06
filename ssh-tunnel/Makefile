FLAG := "html-scraper-server"

ensure: stop
	/bin/bash ensure.sh ${FLAG} & disown

start: stopnoensure
	node proxy-server.js ${FLAG} & disown

stopnoensure:
	/bin/bash kill.sh ${FLAG} ensure.sh

stop:
	/bin/bash kill.sh ${FLAG}




