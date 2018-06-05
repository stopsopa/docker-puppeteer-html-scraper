
if ( ! process.env.P_URL ) {

    process.stdout.write(`Environment variable P_URL is not defined`);

    process.exit(1);
}

if ( ! process.env.P_TMPFILE) {

    process.stdout.write(`Environment variable P_TMPFILE is not defined`);

    process.exit(2);
}

const puppeteer = require('puppeteer');

const fs = require('fs');

const timeout = 15000;

const file = '/app/app/' + process.env.P_TMPFILE;

(async() => {

    const browser = await puppeteer.launch({
        // headless: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-gpu',
            // '--allow-no-sandbox-job',
        ],
        // ignoreHTTPSErrors: true,

        dumpio: true,


        // without this will continue to use the bundled version of Chromium that Puppeteer installs
        // from: https://github.com/GoogleChrome/puppeteer/issues/379#issuecomment-328572755
        // executablePath: '/usr/bin/chromium-browser', // chromium
        executablePath: '/usr/bin/google-chrome', // google chrome


        timeout
    });

    const page = await browser.newPage();

    const scrap = async () => {

        try {

            console.log(`before page.content()`);

            const html = await page.content();

            console.log(`after page.content()`);

            fs.appendFileSync(file, html + '');

            process.exit(0);
        }
        catch (e) {

            console.log(`try catch:` + e.message);

            process.exit(1);
        }
    }

    // https://github.com/GoogleChrome/puppeteer/blob/master/examples/block-images.js
    // await page.setRequestInterception(true);
    //
    // page.on('request', request => {
    //     if (request.resourceType() === 'image')
    //         request.abort();
    //     else
    //         request.continue();
    // });
    //
    page.setDefaultNavigationTimeout(timeout);
    //
    // page.on('error', msg => {
    //
    //     process.stdout.write(`error: ` + JSON.stringify(msg));
    //
    //     browser.close();
    //
    //     process.exit(3);
    // });
    // page.on('pageerror', async msg => {
    //
    //     process.stdout.write(`pageerror: ` + JSON.stringify(msg.message));
    //
    //     // browser.close();
    //     //
    //     // process.exit(4);
    //
    //     return await scrap();
    // });

    process.on("unhandledRejection", async (reason, p) => {

        process.stdout.write("unhandledRejection: Unhandled Promise Rejection, message: >>>" + JSON.stringify(reason.message)+"<<<\n");

        return await scrap();
    });

    const waitUntil = [
        'load',
        'domcontentloaded',
        'networkidle0',
        'networkidle2',
    ]

    console.log(`before goto ${process.env.P_URL}`);

    await page.goto(process.env.P_URL, { waitUntil });

    console.log(`before regular scrap`);

    await scrap();

})();