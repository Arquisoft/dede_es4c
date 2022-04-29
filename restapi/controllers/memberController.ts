import { Request, Response } from 'express';
const asyncHandler = require('express-async-handler')
const Member = require('../model/memberModel');


export const getMembers = async (req: Request, res: Response): Promise<Response> => {
    try {
        var result = await Member.find().exec();
        return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
