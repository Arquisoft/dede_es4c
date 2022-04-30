require('dotenv').config();
const mongoose = require('mongoose');

const connectionString = process.env.MONGO_DB || process.env.MONGO_DB_URL;
const connectionTestString = process.env.MONGO_DB || process.env.MONGO_DB_URL;

function connectBD() {
    console.log("String de conexion: " + connectionString);
    console.log("env.MONGO_DB: " + process.env.MONGO_DB);
    console.log("env.MONGO_DB_URL: " + process.env.MONGO_DB_URL);
    mongoose.connect(connectionString).then(() => {
        console.log("Database connected");
    }).catch((error: Error) => {
        console.error("Error en connection bd.ts: " + error.message);
    })
}

function connectTestBD() {
    mongoose.connect(connectionTestString).then(() => {
        console.log("Test Database connected");
    }).catch(() => {
        console.error("Error en test connection bd.ts");
    })
}

function disconnectBD() {
    mongoose.connection.close();
}

function disconnectTestBD() {
    mongoose.connection.close();
}

module.exports = {
    connectBD: connectBD,
    connectTestBD: connectTestBD,
    disconnectBD: disconnectBD,
    isconnectTestBD: disconnectTestBD
};
