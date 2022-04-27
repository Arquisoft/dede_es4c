const { check } = require('express-validator')
import express, {Router} from 'express';
const { validateFields } = require('../middlewares/validateFields')
const api:Router = express.Router()

import {getOrders, getOrderById, getOrdersByClientId, addOrder} from "../controllers/orderController";
const {isNotEmpty} = require("../middlewares/validateOrders");

  api.get(
    "/orders",
    getOrders
  );

  api.get(
      "/orders/search/:id",
      getOrderById
  );
  
  api.get(
    "/orders/client/:id",
    getOrdersByClientId
);

  api.post(
    "/orders/add",[
      check('cliente').not().isEmpty(),
      check('direccion').not().isEmpty(),
      check('precio').not().isEmpty(),
      validateFields,
      isNotEmpty
    ],addOrder
  );


  module.exports = api;

