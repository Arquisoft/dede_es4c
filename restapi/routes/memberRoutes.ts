import express, {Router} from 'express';
const api:Router = express.Router()
const { check } = require('express-validator')

import { getMembers} from "../controllers/memberController";

api.get(
    "/miembros",
    getMembers
  );

module.exports = api;