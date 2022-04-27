import React, { useState } from 'react';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function ObjetoPedido(props:any){

 var stringProductos = "";

    const setString = () => {
      let a = JSON.stringify(props.pedido._productos)
        let json = JSON.parse(a)
        for(var p in json){
          stringProductos += p + " " + json[p] + " uds."
        }
    }

    setString();

    return (
       <div>
          <Card className='cartItem' sx={{ maxHeight: 430 }}>    
   <CardContent>
      <Typography variant='h4'>
        ID: {props.pedido._id}
      </Typography>     
      <Typography variant='body1'>
        Dirección: {props.pedido._direccion}
      </Typography>
      <Typography display="block">{stringProductos}</Typography>
      <Typography variant='body1'>
        Total: {parseFloat(props.pedido._precio).toFixed(2)} €
      </Typography>
    </CardContent>
    </Card>
    <Divider/>
    </div>
        
      );
}

export default ObjetoPedido;