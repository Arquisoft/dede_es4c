import React from 'react';
import ObjetoPedido from '../components/ObjetoPedido';
import Producto from './Producto';
import image from '../images/pedido.jpg';

var pedido1: Producto[] = [];
var pedido2: Producto[] = [];

const Pedidos = () => {
    pedido1[0] = new Producto("Tortilla", "Tortilla", 3, 2);
    pedido1[1] = new Producto("Pollo", "Pollo", 3, 1);
    pedido1[2] = new Producto("Agua", "Agua", 1.25, 5);

    pedido2[0] = new Producto("Arroz con leche", "Arroz con leche", 2.5, 3);
    pedido2[1] = new Producto("Lomo con Queso", "Lomo con Queso", 2.5, 3);
    pedido2[2] = new Producto("Coca-Cola", "Coca-Cola", 1.5, 3);

    return (
        <div id='pedidos'>
        <main>
            <h1>Tus pedidos:</h1>
            <ObjetoPedido productos = {pedido1} numero = {1}></ObjetoPedido>
            <ObjetoPedido productos = {pedido2} numero = {2}></ObjetoPedido>
        </main>
        <aside>
            <img src={image}></img>
        </aside>
        </div>
        
    );
}

export default Pedidos;