
const path = require('path');

const fs = require('fs');

const launch = require(path.resolve(__dirname, '..', 'driver.js'));

const config = require('../config');

const timeout = 25000;

describe('user', async () => {

    let browser, page;

    beforeAll(async () => {
        browser = await launch({
            // headless: false,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ],

            // without this will continue to use the bundled version of Chromium that Puppeteer installs
            // from: https://github.com/GoogleChrome/puppeteer/issues/379#issuecomment-328572755
            // executablePath: '/usr/bin/chromium-browser', // chromium
            // executablePath: '/usr/bin/google-chrome-unstable', // google chrome


            timeout
        });

        page = await browser.page(true);

        // https://github.com/GoogleChrome/puppeteer/blob/master/examples/block-images.js
        await page.setRequestInterception(true);
        page.on('request', request => {
            if (request.resourceType() === 'image')
                request.abort();
            else
                request.continue();
        });

        page.setDefaultNavigationTimeout(timeout);

        page.on('error', msg => {

            process.stdout.write(`error: ` + JSON.stringify(msg));

            browser.close();

            process.exit(3);
        });
        // page.on('pageerror', msg => {
        //
        //     process.stdout.write(`pageerror: ` + JSON.stringify(msg));
        //
        //     browser.close();
        //
        //     process.exit(4);
        // });

    });

    afterAll(async () => {
        await browser.close();
    });

    it('html', async () => {

        const url = 'https://www.tandfonline.com/action/journalInformation?show=editorialBoard&journalCode=ipho20';

        process.on("unhandledRejection", (event, p) => {

            process.stdout.write("unhandledRejection: Unhandled Rejection at: Promise" + JSON.stringify(p) + "reason:" + JSON.stringify(event.reason));

            browser.close();

            process.exit(5);
        });

        const waitUntil = [
            // 'load',
            // 'domcontentloaded',
            'networkidle0',
            'networkidle2',
        ]

        await page.goto(url, { waitUntil });

        const html = await page.content();

        fs.appendFileSync('./test.html', html + '');

        // await page.getTestServer(url);


        // expect(dimensions.width).toBe(1920)
        // expect(dimensions.height).toBe(1080)
        // expect(dimensions.devicePixelRatio).toBe(1);

        // await page.sleepSec(5);
    });
});