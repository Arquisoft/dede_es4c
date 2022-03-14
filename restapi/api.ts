import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://es4c:es4c@cluster0.hcz1f.mongodb.net/bar_pinchos?retryWrites=true&w=majority')
    .then(() => {
        console.log("Database connected")
    }).catch(()=>{
        console.error("error")
    })
    const { Schema } = mongoose;
const pinchoSchema  = new Schema({
    _id: {
        type: String,
        required: true
    },
     _precio: {
        type: String,
        required: true
    },
    _bebida: {
       type: Boolean,
       required: true
   }
});
const pinchos = mongoose.model('pinchos',pinchoSchema)
const api:Router = express.Router()

api.get("/pinchos", async (req: Request, res: Response): Promise<Response> => {
  try {
      var result = await pinchos.find().exec();
      return res.status(200).json(result);
  } catch (error) {
    return res.status(500).send(error);
  }
});
api.get("/pinchos/search/:id", async (req: Request, res: Response): Promise<Response> => {
  try {
      var result = await pinchos.find({_id:{ $regex: '.*' + req.params.id + '.*' }}).exec();
      return res.status(200).json(result);
  } catch (error) {
    return res.status(500).send(error);
  }
});
api.get("/pinchos/comida", async (req: Request, res: Response): Promise<Response> => {
  try {
      var result = await pinchos.find({_bebida:false}).exec();
      return res.status(200).json(result);
  } catch (error) {
    return res.status(500).send(error);
  }
});
api.get("/pinchos/bebida", async (req: Request, res: Response): Promise<Response> => {
  try {
      var result = await pinchos.find({_bebida:true}).exec();
      return res.status(200).json(result);
  } catch (error) {
    return res.status(500).send(error);
  }
});

export default api;
