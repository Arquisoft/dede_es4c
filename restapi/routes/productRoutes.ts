
import express, {Router} from 'express';
const api:Router = express.Router()

const {
    getProducts,
    getProductById,
    getComidas,
    getBebidas,
    getPostres,
    getVegetariano,
    getNoVegetariano
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
  api.get(
    "/pinchos/postre",
    getPostres
);
  api.get(
    "/pinchos/vegetariano",
    getVegetariano
  );

  api.get(
    "/pinchos/no_vegetariano",
    getNoVegetariano
  );
  module.exports = api;

