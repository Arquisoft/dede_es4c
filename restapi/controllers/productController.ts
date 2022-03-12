import { Request, Response } from 'express';
const asyncHandler = require('express-async-handler')
const Product = require('../model/productModel');


const getProducts = async (req: Request, res: Response): Promise<Response> => {
    try {
        var result = await Product.find().exec();
        return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

const getProductById = async (req: Request, res: Response): Promise<Response> => {
    try {
        var result = await Product.find({_id:{ $regex: '.*' + req.params.id + '.*' }}).exec();
        return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

const getBebidas = async (req: Request, res: Response): Promise<Response> => {
    try {
        var result = await Product.find({_bebida:true}).exec();  
        return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

const getComidas = async (req: Request, res: Response): Promise<Response> => {
    try {
        var result = await Product.find({_bebida:false}).exec();
        return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

module.exports = {
    getProducts,
    getProductById,
    getBebidas,
    getComidas
}
