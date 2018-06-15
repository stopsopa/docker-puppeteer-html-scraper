start: stop
	node server.js --port 7778 html-scraper-pupp-server &> log___.log & disown & disown

stop:
	/bin/bash kill.sh html-scraper-pupp-server

isworking:
	/bin/bash server-is-working.sh html-scraper-pupp-server

status:
	make isworking && echo 'working' || echo 'not working'

build:
	/bin/bash build.sh

test:
	node test-server.js --port 7779
