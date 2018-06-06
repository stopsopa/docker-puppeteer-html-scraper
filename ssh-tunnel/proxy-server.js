
const express   = require('express');

const proxy     = require('http-proxy-middleware');

const result = require('dotenv').config();

if (result.error) {

    throw result.error
}

console.log(JSON.stringify(result.parsed, null, 4));

const host = '0.0.0.0';

const port = process.env.TARGETHOSTPORT;

const nodeport = process.env.NODEPORT;

const app = express();

app.use('/', proxy({target: `http://localhost:${port}`}));

app.listen(nodeport, host, () => {

    console.log(`\n 🌎  Server is running ${host}:${nodeport}\n`)
});