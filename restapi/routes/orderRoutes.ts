
import express, {Router} from 'express';
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
    "/orders/add",
    addOrder
  );

  module.exports = api;

