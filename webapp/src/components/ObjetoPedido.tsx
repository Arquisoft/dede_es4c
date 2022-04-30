import React, { useState } from 'react';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';

function ObjetoPedido(props:any){

 var stringProductos = "";
 var fecha = "";

    const setString = () => {
      let a = JSON.stringify(props.pedido._productos)
        let json = JSON.parse(a)
        for(var p in json){
          stringProductos += p + " " + json[p] + " uds."
        }
    }

    const setFecha = () => {
      let date = new Date(Date.parse(props.pedido._fecha));
      fecha = date + "";
    }

    setString();
    setFecha();

    return (
       <div>
          <Card className='cartItem' sx={{ maxHeight: 430 }}>    
   <CardContent>
      <Typography variant='body1'>
        ID: {props.pedido._id}
      </Typography>     
      
      <Typography display="block">{stringProductos}</Typography>
      <Typography variant='body1'>
        Total: {parseFloat(props.pedido._precio).toFixed(2)} €
      </Typography>
      <Typography variant='body1'>
        Dirección:
      </Typography>
      <Box sx={{ textAlign: 'right' }}>
      <Typography variant='body1'>
        País: {props.pedido._direccion.country}
      </Typography>
      <Typography variant='body1'>
        Ciudad: {props.pedido._direccion.city}
      </Typography>
      <Typography variant='body1'>
        Código Postal: {props.pedido._direccion.zip}
      </Typography>
      <Typography variant='body1'>
        Calle: {props.pedido._direccion.street1}
      </Typography>
      </Box>
      <Typography variant='body1'>
        Fecha: {fecha} 
      </Typography>
    </CardContent>
    </Card>
    <Divider/>
    </div>
        
      );
}

export default ObjetoPedido;