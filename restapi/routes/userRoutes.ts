import express, {Router} from 'express';
const api:Router = express.Router()
const { check } = require('express-validator')

import { signup, login, deleteUser } from "../controllers/userController";

api.post("/signup",[
    check('email').isEmail(),
    check('username').isLength({ min: 1 }).trim().escape(),
], signup);

api.post("/login",[
    check('email').isEmail(),
], login);

api.delete(
    "/user/delete/:id",
    deleteUser
  );

module.exports = api;