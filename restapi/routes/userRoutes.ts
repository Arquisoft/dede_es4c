import express, {Router} from 'express';
const api:Router = express.Router()

import {signup, login} from "../controllers/userController";

api.post("/signup", signup);

api.post("/login", login);

module.exports = api;