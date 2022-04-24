import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Producto from "./Producto";
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Order } from '../shared/shareddtypes';

function ObjetoPedido(props:any){
    var productosDelPedido = "";
    var precioFinal = 0;


    return (
       
          <Card className='cartItem' sx={{ maxHeight: 430 }}>    
   <CardContent>
      <Typography variant='h4'>
        ID: {props.pedido._id}
      </Typography>     
      <Typography variant='body1'>
        Dirección: {props.pedido._direccion}
      </Typography>
      <Typography>{JSON.stringify(props.pedido._productos)}</Typography>
      <Typography variant='body1'>
        Total: {props.pedido._precio}
      </Typography>
    </CardContent>
    </Card>
 
        
      );
}

export default ObjetoPedido;