import express, {Router} from 'express';
const api:Router = express.Router()
const { check } = require('express-validator')

import {verify, signup, login} from "../controllers/userController";

api.post("/verify", verify);

api.post("/signup",[
    check('email').isEmail(),
    check('username').isLength({ min: 1 }).trim().escape(),
], signup);

api.post("/login",[
    check('email').isEmail(),
], login);

module.exports = api;