const { check } = require('express-validator')
import express, {Router} from 'express';
const { validateFields } = require('../middlewares/validateFields')
const api:Router = express.Router()

import {getOrders, getOrderById, getOrdersByClientId, addOrder} from "../controllers/orderController";

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
      check('productosCarrito', 'an order must contains products').not().isEmpty(),
      check('cliente').not().isEmpty(),
      check('direccion').not().isEmpty(),
      check('precio').not().isEmpty(),
      validateFields
    ],addOrder
  );

  module.exports = api;

