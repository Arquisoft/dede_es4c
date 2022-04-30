import { Request, Response, NextFunction } from "express";

const Order = require('../model/orderModel')

const isNotEmpty = async (req: Request, res: Response, next: NextFunction) => {
    let productos = req.body.productosCarrito;
    if (Object.keys(productos).length < 1) {
        return res.status(401).json({
            msg: 'The order must contains products'
        })
    }
    next();
}

module.exports = {
    isNotEmpty
}