import request, { Response } from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
const productRoutes = require('../routes/productRoutes');
const userRoutes = require('../routes/userRoutes');
const orderRoutes = require('../routes/orderRoutes');
const memberRoutes = require('../routes/memberRoutes');
const jwt = require("jsonwebtoken");

let app: Application;
let server: http.Server;
require('dotenv').config();

const mongoose = require("mongoose");

const bd = require('../config/bd');


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
    app.use('/api', memberRoutes);

    server = app.listen(port, (): void => {
        console.log('Restapi server for testing listening on ' + port);
    }).on("error", (error: Error) => {
        console.error('Error occured: ' + error.message);
    });

    bd.connectTestBD();
});

afterAll(async () => {
    server.close(); //close the server
    bd.disconnectTestBD();
});

describe('products ', () => {
    it('All products can be listed', async () => {
        const response: Response = await request(app).get("/api/pinchos");
        expect(response.text).not.toEqual('[]')
        expect(response.statusCode).toBe(200);
    });

    it('All vegetarian products can be listed', async () => {
        const response: Response = await request(app).get("/api/pinchos/vegetariano");
        expect(response.body[0]._vegetariano).toBeTruthy();
        expect(response.statusCode).toBe(200);
    });

    it('All no vegetarian products can be listed', async () => {
        const response: Response = await request(app).get("/api/pinchos/no_vegetariano");
        expect(response.body[0]._vegetariano).not.toBeTruthy();
        expect(response.statusCode).toBe(200);
    });

    it('A existing prodcut can be searched correctly by its name', async () => {
        let id: string = 'tortilla'
        const response: Response = await request(app).get('/api/pinchos/search/' + id)
        expect(response.text).toEqual('[{"_id":"tortilla","_precio":"1.5","_tipo":"pincho","_vegetariano":true,"_descripcion":"Pincho de tortilla con cebolla y poco hecha","_ingredientes":["huevo","patata"]}]')
        expect(response.statusCode).toBe(200);
    });

    it('Try to search a nonexistent product', async () => {
        let id: string = 'nada'
        const response: Response = await request(app).get('/api/pinchos/search/' + id)
        expect(response.text).toEqual('[]')
        expect(response.statusCode).toBe(200);
    });

    it('All food can be listed', async () => {
        const response: Response = await request(app).get('/api/pinchos/comida')
        checkProductList(response, 'pincho');
    });

    it('All drinks can be listed', async () => {
        const response: Response = await request(app).get('/api/pinchos/bebida')
        checkProductList(response, 'bebida');
    });

    it('All desserts can be listed', async () => {
        const response: Response = await request(app).get('/api/pinchos/postre')
        checkProductList(response, 'postre');
    });
    
    it('All vegetarian food can be listed', async () => {
        const response: Response = await request(app).get('/api/pinchos/vegetariano')
        checkIfVegetarianList(response);
    });

    it('All not vegetarian food can be listed', async () => {
        const response: Response = await request(app).get('/api/pinchos/no_vegetariano')
        checkIfNotVegetarianList(response);
    });
});

function checkProductList(response: Response, tipo: string) {
    expect(response.text).not.toEqual('[]')
    expect(response.body[0]._tipo).toBe(tipo);
    expect(response.statusCode).toBe(200);
}
function checkIfVegetarianList(response: Response) {
    expect(response.text).not.toEqual('[]')
    expect(response.body[0]._vegetariano).toBe(true);
    expect(response.statusCode).toBe(200);
}
function checkIfNotVegetarianList(response: Response) {
    expect(response.text).not.toEqual('[]')
    expect(response.body[0]._vegetariano).toBe(false);
    expect(response.statusCode).toBe(200);
}

describe('user', () => {
    it('Login ', async () => {
        // Login an existent user

        let user = { "email": "dani@gmail.com", "password": process.env.PASSWD1 }

        let response: Response = await request(app).post('/api/login').send(user).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();

        // Login an unexistent user

        user = { "email": "e@e.com", "password": process.env.PASSWD1 }


        response = await request(app).post('/api/login').send(user).set('Accept', 'application/json');
        expect(response.statusCode).toBe(400);

        // Login a user with wrong credentials

        user = { "email": "dani@gmail.com", "password": process.env.PASSWD2 }

        response = await request(app).post('/api/login').send(user).set('Accept', 'application/json');
        expect(response.statusCode).toBe(400);
    });

    it('Signup', async () => {

        let user = { "email": "g@g.com", "username": "g", "password": process.env.PASSWD1 }


        let response: Response = await request(app).post('/api/signup').send(user).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();


        user = { "email": "dani@gmail.com", "username": "dani", "password": process.env.PASSWD1 }


        response = await request(app).post('/api/signup').send(user).set('Accept', 'application/json');
        expect(response.statusCode).toBe(400);
    });

    it('Delete an existent user', async () => {

        let user = { "email": "g@g.com", "password": process.env.PASSWD1 };


        const response: Response = await request(app).post('/api/login').send(user).set('Accept', 'application/json');
        let token_decoded = jwt.decode(response.body.token);
        const deleteResponse: Response = await request(app).delete('/api/user/delete/' + token_decoded.user._id).set('Accept', 'application/json');
        expect(deleteResponse.statusCode).toBe(200);
    });

});

describe('order', () => {
    let orderId = "";

    it('Get all orders', async () => {
        const response: Response = await request(app).get('/api/orders');
        expect(response.text).not.toEqual('[]')
        expect(response.statusCode).toBe(200);
    });

    it('Get an order by id', async () => {
        const response: Response = await request(app).get('/api/orders/search/6267dddeb3f9321636008a12');
        let order = {
            "_id": "6267dddeb3f9321636008a12",
            "_cliente_id": "6267d1b146eb782a750f0c64",
            "_direccion": {
                "street1": "Albemarle Terrace",
                "city": "Boston",
                "state": "MA",
                "zip": "02115",
                "country": "US"
            },
            "_precio": "1.15",
            "_productos": {
                "jamon": "1"
            },
            "__v": 0
        };
        expect(response.body[0]).toEqual(order);
        expect(response.statusCode).toBe(200);
    });

    it('Get all client orders', async () => {
        const response: Response = await request(app).get('/api/orders/client/62435238812b311f8dea8715');
        expect(response.text).not.toEqual('[]')
        expect(response.body[0]._cliente_id).toEqual('62435238812b311f8dea8715')
        expect(response.statusCode).toBe(200);
    });

    it('Create an order', async () => {
        const newOrder = {
            cliente: "62435238812b311f8dea8715",
            direccion: {
                "street1": "Albemarle Terrace",
                "city": "Boston",
                "state": "MA",
                "zip": "02115",
                "country": "US"
            },
            precio: "4",
            productosCarrito: { "especial": "1" },
            fecha: "2022-04-27T18:03:18.327+00:00"
        };
        const response: Response = await request(app).post('/api/orders/add').send(newOrder).set('Accept', 'application/json');
        orderId = response.body._id;
        expect(response.statusCode).toBe(200);
    });

    it('Delete an order', async () => {
        const response: Response = await request(app).delete('/api/orders/delete/' + orderId);
        expect(response.statusCode).toBe(200);
    });
});
describe('members ', () => {
    it('All products can be listed', async () => {
        const response: Response = await request(app).get("/api/miembros");
        expect(response.text).not.toEqual('[]')
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(4);
    });
});