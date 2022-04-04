import request, {Response} from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
const productRoutes = require('../routes/productRoutes');
const userRoutes = require('../routes/userRoutes');
const orderRoutes = require('../routes/orderRoutes');

let app:Application;
let server:http.Server;
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
    /**
     * Test that we can list users without any error.
     */
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