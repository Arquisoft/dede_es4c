
import express, {Router} from 'express';
const api:Router = express.Router()

const {
    getProducts,
    getProductById,
    getComidas,
    getBebidas
} = require('../controllers/productController')

  api.get(
    "/list",
    getProducts
  );

  api.get(
      "/list/search/:id",
      getProductById
  );

  api.get(
      "/list/comidas",
      getComidas
  );

  api.get(
      "/list/bebidas",
      getBebidas
  );

  module.exports = api;

