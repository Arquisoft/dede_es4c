import React, {useState, useEffect, useContext} from 'react';
import ObjetoPedido from '../components/ObjetoPedido';
import Producto from './Producto';
import { getOrderByClientId } from '../api/api';
import { UserContext } from '../context/userContext';
import {Order} from '../shared/shareddtypes';
import { copyFileSync } from 'fs';
import List from '@mui/material/List';


var pedido1: Producto[] = [];
var pedido2: Producto[] = [];
var nada: String[] = [];
var listaPedidos: Order[] = [];

const Pedidos = () => {
    const {stateUser} = useContext(UserContext);
    const [pedidos, setPedidos] = useState(listaPedidos);

    pedido1[0] = new Producto("Tortilla", "Tortilla", 3, 2, "nada", false, nada);
    pedido1[1] = new Producto("Pollo", "Pollo", 3, 1, "nada", false, nada);
    pedido1[2] = new Producto("Agua", "Agua", 1.25, 5, "nada", false, nada);

    pedido2[0] = new Producto("Arroz con leche", "Arroz con leche", 2.5, 3, "nada", false, nada);
    pedido2[1] = new Producto("Lomo con Queso", "Lomo con Queso", 2.5, 3, "nada", false, nada);
    pedido2[2] = new Producto("Coca-Cola", "Coca-Cola", 1.5, 3, "nada", false, nada);

    useEffect(() => {
        getPedidos();
    }, [])

    const getPedidos = async () => {
        setPedidos(await getOrderByClientId(stateUser.user._id));
        let a = JSON.stringify(pedidos[0]._productos)
        let json = JSON.parse(a)
        for(var p in json){
            console.log(p)
        }
    }

    return (
        <div id='pedidos'>
            <main>
                <h1>Tus pedidos:</h1>
                <List sx={{
                        width: '100%',
                        maxWidth: 480,
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 400,
                        '& ul': { padding: 0 },
                      }}>
                {pedidos.map((pedido) => (
                    
                    <ObjetoPedido pedido={pedido}/>
                    
                ))}
                </List>
            </main>
        </div>
        
    );
}

export default Pedidos;