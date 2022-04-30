require('dotenv').config();
const mongoose = require('mongoose');

const connectionString = process.env.MONGO_DB || process.env.MONGO_DB_URL;
const connectionTestString = process.env.MONGO_DB || process.env.MONGO_DB_URL;

module.exports.connectBD = async () => {
    console.log("String de conexion: " + connectionString);
    console.log("env.MONGO_DB: " + process.env.MONGO_DB);
    console.log("env.MONGO_DB_URL: " + process.env.MONGO_DB_URL);
    mongoose.connect(connectionString).then(() => {
        console.log("Database connected");
    }).catch((error: Error) => {
        console.error("Error en connection bd.ts: " + error.message);
    })
}


module.exports.connectTestBD = async () => {
    mongoose.connect(connectionTestString).then(() => {
        console.log("Test Database connected");
    }).catch(() => {
        console.error("Error en test connection bd.ts");
    })
}

module.exports.disconnectBD = async () => {
    mongoose.connection.close();
}

module.exports.disconnectTestBD = async () => {
    mongoose.connection.close();
}
