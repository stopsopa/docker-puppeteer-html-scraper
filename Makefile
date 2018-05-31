start: stop
	node server.js --port 7778 html-scraper-puppeteer

stop:
	/bin/bash kill.sh html-scraper-puppeteer

status:
	/bin/bash server-is-working.sh  html-scraper-puppeteer && echo 'working' || echo 'not working'

build:
	/bin/bash build.sh

test:
	node test-server.js --port 7779
