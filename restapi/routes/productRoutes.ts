
import express, {Router} from 'express';
const api:Router = express.Router()

const {
    getProducts,
    getProductById,
    getComidas,
    getBebidas
} = require('../controllers/productController')

  api.get(
    "/pinchos",
    getProducts
  );

  api.get(
      "/pinchos/search/:id",
      getProductById
  );

  api.get(
      "/pinchos/comida",
      getComidas
  );

  api.get(
      "/pinchos/bebida",
      getBebidas
  );

  module.exports = api;

