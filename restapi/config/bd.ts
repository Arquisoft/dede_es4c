require('dotenv').config();
const mongoose = require('mongoose');

const connectionString = process.env.MONGO_DB;
const connectionTestString = process.env.MONGO_DB;

const connectBD = async () => {
    mongoose.connect(connectionString).then(() => {
        console.log("Database connected");
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
