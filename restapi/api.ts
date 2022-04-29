import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://es4c:es4c@cluster0.hcz1f.mongodb.net/bar_pinchos?retryWrites=true&w=majority')
    .then(() => {
        console.log("Database connected")
    }).catch((error:Error)=>{
        console.error("error: " + error.message)
    })
    const { Schema } = mongoose;
const api:Router = express.Router()

export default api;
