import React, { useContext, useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

function Producto(props: any) {

    var image = "pinchos/" + props.producto.nombre + ".jpg"
    var titulo = props.producto.nombre + "(" + props.producto.cantidad + " uds.)"
    var precioFinal = "Total: " + props.producto.cantidad * props.producto.precio + "€"

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    <ListItem>
        <ListItemAvatar>
            <Avatar alt = {props.producto.nombre} src = {image} sx={{ width: 50, height: 50 }}/>
        </ListItemAvatar>
        <ListItemText primary={titulo} secondary={precioFinal} />
    </ListItem>
    </List>
  );
}

export default Producto;