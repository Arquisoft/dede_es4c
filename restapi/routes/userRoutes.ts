import express, {Router} from 'express';
const api:Router = express.Router()

import {verify, signup, login} from "../controllers/userController";

api.post("/verify", verify);

api.post("/signup", signup);

api.post("/login", login);

module.exports = api;