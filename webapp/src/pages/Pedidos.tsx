import React, {useState, useEffect, useContext} from 'react';
import ObjetoPedido from '../components/ObjetoPedido';
import Divider from '@mui/material/Divider';
import { getOrderByClientId } from '../api/api';
import { UserContext } from '../context/userContext';
import {Order} from '../shared/shareddtypes';
import List from '@mui/material/List';
import { Typography } from '@mui/material';
import './styles/pedidos.css';

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
                
                {pedidos.length != 0 &&
                <div>
                <h1>Tus pedidos:</h1>
                <List sx={{
                        
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
                </div>
                }
                {pedidos.length == 0 &&
                    <Typography variant='h2'>
                        Todavía no has realizado ningún pedido
                    </Typography>
                }
            </main>
        </div>
        
    );
}

export default Pedidos;