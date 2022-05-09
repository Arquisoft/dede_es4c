import express, { Application } from 'express';
import https from "https";
import path from 'path';
require('dotenv').config();
//for using an import here we need to configure the tsconfig.json
//setting the option module to commonjs

var app: Application = express()
const port: number = 3000;

let credentials = {key: process.env.HTTPS_PRIVATEKEY, cert: process.env.HTTPS_CERTIFICATE};
let httpsServer = https.createServer(credentials, app);

app.use(express.static('build'))
app.use(express.static('public'));

httpsServer.listen(port, (): void => {
    console.log('Webapp started on port ' + port);
}).on("error", (error: Error) => {
    console.error('Error occured: ' + error.message);
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});