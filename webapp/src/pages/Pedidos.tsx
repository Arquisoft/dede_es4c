import React, {useState, useEffect, useContext} from 'react';
import ObjetoPedido from '../components/ObjetoPedido';
import Divider from '@mui/material/Divider';
import { getOrderByClientId } from '../api/api';
import { UserContext } from '../context/userContext';
import {Order} from '../shared/shareddtypes';
import List from '@mui/material/List';

var listaPedidos: Order[] = [];

const Pedidos = () => {
    const {stateUser} = useContext(UserContext);
    const [pedidos, setPedidos] = useState(listaPedidos);

    useEffect(() => {
        getPedidos();
    }, [])

    const getPedidos = async () => {
        setPedidos(await getOrderByClientId(stateUser.user._id));
    }

    return (
        <div id='pedidos'>
            <main>
                <h1>Tus pedidos:</h1>
                <List sx={{
                        width: '100%',
                        maxWidth: 900,
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 500,
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