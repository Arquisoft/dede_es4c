
import express, {Router} from 'express';
const api:Router = express.Router()

const {
  getOrders,
  getOrderById,
  getOrdersByClientId,
  addOrder
} = require('../controllers/orderController')

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

  api.get(
    "/orders/add/:client/:direccion/:precio/:productos",
    addOrder
  );

  module.exports = api;

