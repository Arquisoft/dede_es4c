import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Producto from "./Producto";
import Divider from '@mui/material/Divider';

function ObjetoPedido(props:any){
    var productosDelPedido = "";
    var precioFinal = 0;
    {props.productos.map((producto: Producto) =>{
            productosDelPedido += producto.nombre + " - cant: " + producto.cantidad + ", ";
            precioFinal += producto.precio;
        }
    )}
    var titulo = "Pedido número " + props.numero + " (" + precioFinal + "€)"
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListItem>
            <ListItemText primary={titulo}  secondary= {productosDelPedido} />
          </ListItem>
          <Divider />
        </List>
      );
}

export default ObjetoPedido;