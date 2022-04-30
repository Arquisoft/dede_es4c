require('dotenv').config();
const mongoose = require('mongoose');

const connectionString = process.env.MONGO_DB || process.env.MONGO_DB_URL;
const connectionTestString = process.env.MONGO_DB || process.env.MONGO_DB_URL;

const connectBD = async () => {
    mongoose.connect(connectionString).then(() => {
        console.log("Database connected");
        console.log("String de conexion: " + connectionString);
        console.log("env.MONGO_DB: " + process.env.MONGO_DB);
        console.log("env.MONGO_DB_URL: " + process.env.MONGO_DB_URL);
    }).catch((error: Error) => {
        console.error("Error en connection bd.ts: " + error.message);
    })
}

const connectTestBD = async () => {
    mongoose.connect(connectionTestString).then(() => {
        console.log("Test Database connected");
    }).catch(() => {
        console.error("Error en test connection bd.ts");
    })
}

const disconnectBD = async () => {
    mongoose.connection.close();
}

const disconnectTestBD = async () => {
    mongoose.connection.close();
}

module.exports = {
    connectBD: connectBD,
    connectTestBD: connectTestBD,
    disconnectBD: disconnectBD,
    disconnectTestBD: disconnectTestBD
};
