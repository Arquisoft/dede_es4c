
import express, {Router} from 'express';
const api:Router = express.Router()

const {
    getProducts,
    getProductById
} = require('../controllers/productController')

  api.get(
    "/list",
    getProducts
  );

  api.get(
      "/list/:id",
      getProductById
  );

  module.exports = api;

