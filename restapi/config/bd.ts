require('dotenv').config();
const mongoose = require('mongoose');

const connectionString = process.env.MONGO_DB;
const connectionTestString = process.env.MONGO_TEST_DB;

const connectBD = async () => {
    mongoose.connect("mongodb+srv://es4c:es4c@cluster0.hcz1f.mongodb.net/bar_pinchos?retryWrites=true&w=majority").then(() => {
        console.log("Database connected");
    }).catch((error: Error) => {
        console.log(connectionString);
        console.error("Error en connection bd.ts: " + error.message);
    });
}

const connectTestBD = async () => {
    mongoose.connect(connectionTestString).then(() => {
        console.log("Test Database connected");
    }).catch((error: Error) => {
        console.error("Error en test connection bd.ts " + error.message);
    });
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
