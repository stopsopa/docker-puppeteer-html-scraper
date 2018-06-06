start: stop
	node server.js --port 7778 html-scraper-pupp-server & disown

stop:
	/bin/bash kill.sh html-scraper-pupp-server

status:
	/bin/bash server-is-working.sh  html-scraper-pupp-server && echo 'working' || echo 'not working'

build:
	/bin/bash build.sh

test:
	node test-server.js --port 7779
