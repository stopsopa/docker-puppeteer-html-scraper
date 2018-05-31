#!/bin/bash

set -e

set -o xtrace

/bin/bash server-is-working.sh html-scraper-puppeteer || make start & disown