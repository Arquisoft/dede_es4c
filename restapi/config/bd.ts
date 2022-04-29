require('dotenv').config()
const mongoose = require('mongoose')

const connectionString = process.env.MONGO_DB;

const connectBD = async () => {
    mongoose.connect(connectionString)
    .then(() => {
        console.log("Database connected")
    }).catch((error:Error)=>{
        console.error("error: " + error.message)
    })
}

module.exports = connectBD;
