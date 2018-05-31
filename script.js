
if ( ! process.env.P_URL ) {

    process.stdout.write(`Environment variable P_URL is not defined`);

    process.exit(1);
}

if ( ! process.env.P_TMPFILE) {

    process.stdout.write(`Environment variable P_TMPFILE is not defined`);

    process.exit(2);
}

// https://stackoverflow.com/a/6182519/5560682
const config = JSON.parse(Buffer.from(process.env.P_JSON, 'base64').toString('ascii') || '{}') || {};

const puppeteer = require('puppeteer');

const fs = require('fs');

const path = require('path');

const timeout = 15000;

try {

(async() => {

    const browser = await puppeteer.launch({
        // headless: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ],

        // without this will continue to use the bundled version of Chromium that Puppeteer installs
        // from: https://github.com/GoogleChrome/puppeteer/issues/379#issuecomment-328572755
        // executablePath: '/usr/bin/chromium-browser', // chromium
        executablePath: '/usr/bin/google-chrome-unstable', // google chrome


        timeout
    });

        const page = await browser.newPage();

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
        page.on('pageerror', msg => {

            process.stdout.write(`pageerror: ` + JSON.stringify(msg));

            browser.close();

            process.exit(4);
        });

        process.on("unhandledRejection", (reason, p) => {

            process.stdout.write("unhandledRejection: Unhandled Rejection at: Promise" + JSON.stringify(p) + "reason:" + JSON.stringify(reason));

            browser.close();

            process.exit(5);
        });

        const waitUntil = [
            'load',
            'domcontentloaded',
            'networkidle0',
            'networkidle2',
        ]

        await page.goto(process.env.P_URL, { waitUntil });
        //
        // page.waitForNavigation({ waitUntil }),
        // page.waitForNavigation({ waitUntil }),

        // await new Promise(resolve => setTimeout(resolve, 300));

        // https://github.com/GoogleChrome/puppeteer/issues/666#issuecomment-326796411
        // await page.pdf({
        //     path: '/app/app/' + process.env.P_TMPFILE,
        //     printBackground: true,
        //     format: 'A4',
        //     margin: { top: 0, right: 0, bottom: 0, left: 0 },
        //     scale: 0.7
        // });

            let pdfConfig = {
                ...config.pdf,
                ...{
                    path: '/app/app/' + process.env.P_TMPFILE
                }
            };

            if (/^(\d+\.)?\d+$/.test(pdfConfig.scale)) {
                pdfConfig.scale = parseFloat(pdfConfig.scale);
            }
            else {
                delete pdfConfig.scale;
            }

            // pdfConfig = {
            //     path: '/app/app/' + process.env.P_TMPFILE,
            //     format: 'A4',
            //     displayHeaderFooter: true,
            //     footerTemplate:  '<div>Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
            //     margin: {
            //         top: '100px',
            //         right: '20px',
            //         bottom: '100px',
            //         left: '20px'
            //     },
            // }

            // fs.writeFileSync('/app/app/test.log', "\n\n"+ (new Date()).toISOString().substring(0, 19).replace('T', ' ')+"\n\n"+JSON.stringify(pdfConfig, null, 4)+"\n\n");

            const html = await page.content();

        // process.stdout.write(`\n\n\n\nccccccrrrrrassssshhh\n\n\n\n`);
        //
        // process.exit(1);

            fs.appendFileSync(pdfConfig.path, html + '');

                                // await page.pdf(pdfConfig);

        // process.stdout.write(`ret: ${JSON.stringify(pdfConfig, null, 4)}`);
        //
        // process.exit(1);

        browser.close();

})();

}
catch (e) {

    process.stdout.write(`puppeteer catch: ` + JSON.stringify(e.message));

    browser.close();

    process.exit(6);
}
