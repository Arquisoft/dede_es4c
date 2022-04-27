import request, {Response} from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
const productRoutes = require('../routes/productRoutes');
const userRoutes = require('../routes/userRoutes');
const orderRoutes = require('../routes/orderRoutes');
const jwt = require("jsonwebtoken");

let app:Application;
let server:http.Server;
require('dotenv').config();
const mongoose = require("mongoose");
const connectionString = 'mongodb+srv://es4c:es4c@cluster0.hcz1f.mongodb.net/bar_pinchos?retryWrites=true&w=majority';
beforeAll(async () => {
    app = express();
    const port: number = 5000;
    const options: cors.CorsOptions = {
        origin: ['http://localhost:3000']
    };
    app.use(cors(options));
    app.use(bp.json());
    app.use('/api', userRoutes);
    app.use('/api', orderRoutes);
    app.use('/api', productRoutes);

    server = app.listen(port, ():void => {
        console.log('Restapi server for testing listening on '+ port);
    }).on("error",(error:Error)=>{
        console.error('Error occured: ' + error.message);
    });
    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
});

afterAll(async () => {
    server.close() //close the server
    mongoose.connection.close();
})

describe('products ', () => {
    
    it('can be listed',async () => {
        const response:Response = await request(app).get("/api/pinchos");
        expect(response.statusCode).toBe(200);
    });
    it('can be listed',async () => {
        const response:Response = await request(app).get("/api/pinchos/search/a");
        expect(response.statusCode).toBe(200);
    });
    it('can be listed',async () => {
        const response:Response = await request(app).get("/api/pinchos/comida");
        expect(response.statusCode).toBe(200);
    });
    it('can be listed',async () => {
        const response:Response = await request(app).get("/api/pinchos/bebida");
        expect(response.statusCode).toBe(200);
    });
    it('can be listed',async () => {
        const response:Response = await request(app).get("/api/pinchos/postre");
        expect(response.statusCode).toBe(200);
    });
    it('can be listed',async () => {
        const response:Response = await request(app).get("/api/pinchos/vegetariano");
        expect(response.statusCode).toBe(200);
    });
    it('can be listed',async () => {
        const response:Response = await request(app).get("/api/pinchos/no_vegetariano");
        expect(response.statusCode).toBe(200);
    });
    it('can be listed',async () => {
        const response:Response = await request(app).get("/api/orders");
        expect(response.statusCode).toBe(200);
    });
    
    // Tests that a user can be created through the productService without throwing any errors.     
    it('can be searched correctly', async () => {
        let id:string = 'tortilla'
        const response:Response = await request(app).get('/api/pinchos/search/'+id)
        expect(response.text).toEqual('[{"_id":"tortilla","_precio":"1.5","_tipo":"pincho","_vegetariano":true,"_descripcion":"Pincho de tortilla con cebolla y poco hecha","_ingredientes":["huevo","patata"]}]')
        expect(response.statusCode).toBe(200);
    });

    it('can be searched correctly', async () => {
        let id:string = 'nada'
        const response:Response = await request(app).get('/api/pinchos/search/'+id)
        expect(response.text).toEqual('[]')
        expect(response.statusCode).toBe(200);
    });

    it('can be searched correctly', async () => {
        const response:Response = await request(app).get('/api/pinchos/comida')
        expect(response.text).not.toEqual('[]')
        expect(response.statusCode).toBe(200);
    });
    
    it('can be searched correctly', async () => {
        const response:Response = await request(app).get('/api/pinchos/bebida')
        expect(response.text).not.toEqual('[]')
        expect(response.statusCode).toBe(200);
    });
    
    it('can be searched correctly', async () => {
        const response:Response = await request(app).get('/api/pinchos/postre')
        expect(response.text).not.toEqual('[]')
        expect(response.statusCode).toBe(200);
    });
    
    it('can be searched correctly', async () => {
        const response:Response = await request(app).get('/api/pinchos/nadanadanadada')
        expect(response.statusCode).toBe(404);
    });
    
    it('can be searched correctly', async () => {
        const response:Response = await request(app).get('/api/orders')
        expect(response.text).not.toEqual('[]')
        expect(response.statusCode).toBe(200);
    });
});

describe('user', () => {
    it('Login an existent user', async () => {
        let user = {"email": "dani@gmail.com", "password":"123456"}

        const response:Response = await request(app).post('/api/login').send(user).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();
    })

    it('Login an user that not exists', async () => {
        let user = {"email": "e@e.com", "password":"123456"}

        const response:Response = await request(app).post('/api/login').send(user).set('Accept', 'application/json');
        expect(response.statusCode).toBe(400);
    })

    it('Signup a new user', async () => {
        let user = {"email": "g@g.com", "username": "g", "password":"123456"}

        const response:Response = await request(app).post('/api/signup').send(user).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();
    })

    it('Signup an existent user', async () => {
        let user = {"email": "dani@gmail.com", "password":"123456"}

        const response:Response = await request(app).post('/api/signup').send(user).set('Accept', 'application/json');
        expect(response.statusCode).toBe(400);
    })

    it('Delete an existent user', async () => {
        let user = {"email": "g@g.com", "password":"123456"};

        const response:Response = await request(app).post('/api/login').send(user).set('Accept', 'application/json');
        var token_decoded = jwt.decode(response.body.token);
        const deleteResponse:Response = await request(app).delete('/api/user/delete/' + token_decoded.user._id).set('Accept', 'application/json');
        expect(deleteResponse.statusCode).toBe(200);
    })

})

describe('order', () => {
    let orderId = "";

    it('Get all orders', async () => {
        const response:Response = await request(app).get('/api/orders');
        expect(response.statusCode).toBe(200);
    });

    it('Get an order by id', async () => {
        const response:Response = await request(app).get('/api/orders/search/624bf262c08e3fe695b2ee99');
        expect(response.statusCode).toBe(200);
    });

    it('Get all client orders', async () => {
        const response:Response = await request(app).get('/api/orders/client/62435238812b311f8dea8715');
        expect(response.statusCode).toBe(200);
    });

    it('Create an order', async () => {
        const newOrder = {
            cliente: "62435238812b311f8dea8715",
            direccion: "prueba",
            precio: "4",
            productosCarrito: {"especial": "1"},
            fecha: "2022-04-27T18:03:18.327+00:00"
          };
        const response:Response = await request(app).post('/api/orders/add').send(newOrder).set('Accept', 'application/json');
        console.log(response.body._id)
        orderId = response.body._id;
        expect(response.statusCode).toBe(200);
    });

    
});