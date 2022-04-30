import express, { Router } from 'express';

const connectionString = process.env.MONGO_DB;

const mongoose = require('mongoose');
mongoose.connect(connectionString).then(() => {
    console.log("Database connected")
}).catch(() => {
    console.error("Error en api.ts")
})

const { Schema } = mongoose;
const api: Router = express.Router()

export default api;
