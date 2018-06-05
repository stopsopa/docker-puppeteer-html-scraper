
const express   = require('express');

const proxy     = require('http-proxy-middleware');

const result = dotenv.config();

if (result.error) {

    throw result.error
}

console.log(JSON.stringify(result.parsed, null, 4));

const host = '0.0.0.0';

const port = process.env.TARGETHOSTPORT;

app.listen(port, host, () => {

    console.log(`\n 🌎  Server is running ${host}:${port}\n`)
});