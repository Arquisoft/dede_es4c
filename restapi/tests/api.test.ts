import request, {Response} from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import api from '../api';

let app:Application;
let server:http.Server;

beforeAll(async () => {
    app = express();
    const port: number = 5000;
    const options: cors.CorsOptions = {
        origin: ['http://localhost:3000']
    };
    app.use(cors(options));
    app.use(bp.json());
    app.use("/api", api)

    server = app.listen(port, ():void => {
        console.log('Restapi server for testing listening on '+ port);
    }).on("error",(error:Error)=>{
        console.error('Error occured: ' + error.message);
    });
});

afterAll(async () => {
    server.close() //close the server
})

describe('user ', () => {
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
    it('can be listed',async () => {
        const response:Response = await request(app).get("/api/orders/search/a");
        expect(response.statusCode).toBe(200);
    });
    it('can be listed',async () => {
        const response:Response = await request(app).get("/api/client/a");
        expect(response.statusCode).toBe(200);
    });
    it('can be listed',async () => {
        const response:Response = await request(app).get("/api/client/a");
        expect(response.statusCode).toBe(200);
    });
    /**
     * Tests that a user can be created through the productService without throwing any errors.
     
    it('can be created correctly', async () => {
        let username:string = 'Pablo'
        let email:string = 'gonzalezgpablo@uniovi.es'
        const response:Response = await request(app).post('/api/users/add').send({name: username,email: email}).set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
    });*/
});