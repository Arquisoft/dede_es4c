import { Request, Response } from 'express';
import { type } from 'os';
const asyncHandler = require('express-async-handler')
const Order = require('../model/orderModel');


export const  getOrders = async (req: Request, res: Response): Promise<Response> => {
    try {
        var result = await Order.find().exec();
        return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  export const  getOrderById = async (req: Request, res: Response): Promise<Response> => {
    try {
        var result = await Order.find({_id:req.params.id}).exec();
        return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
  export const  getOrdersByClientId = async (req: Request, res: Response): Promise<Response> => {
    try {
        var result = await Order.find({_cliente_id:req.params.id}).exec();
        return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
  export const  addOrder = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { cliente, direccion, precio, productosCarrito } = req.body;
      console.log(req.body);
      const newOrder = new Order({
        _cliente_id: cliente,
        _direccion: direccion,
        _precio: precio,
        _productos: productosCarrito
     });
     console.log(newOrder)
        newOrder.save();
        return res.status(200).json(newOrder);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
