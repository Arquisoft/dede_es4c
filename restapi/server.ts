import express, { Application, RequestHandler } from "express";
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const memberRoutes = require('./routes/memberRoutes');
import https from "https";

const bd = require('./config/bd');
bd.connectBD();

const app: Application = express();
const port: number = 5000;

const metricsMiddleware: RequestHandler = promBundle({ includeMethod: true });
app.use(metricsMiddleware);

const options: cors.CorsOptions = {
  origin: [/\/\/localhost(:\d+)?$/, /\/\/dede-es4c\.centralus\.cloudapp\.azure\.com(:\d+)?$/]
};

app.use(cors(options));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use('/api', productRoutes);
app.use('/api', userRoutes);
app.use('/api', orderRoutes);
app.use('/api', memberRoutes);
//app.use("/api", api)

let credentials = {key: process.env.HTTPS_KEY, cert: process.env.HTTPS_CERTIFICATE}

let httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, (): void => {
  console.log('Restapi listening on ' + port);
}).on("error", (error: Error) => {
  console.error('Error occured: ' + error.message);
});

//so the program will not close instantly
process.stdin.resume();

function exitHandler() {
  bd.disconnectBD();
  console.log("App stopped");
}

//do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
