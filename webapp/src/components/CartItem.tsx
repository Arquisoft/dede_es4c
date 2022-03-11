import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './styles/producto.css';

function Producto(props: any) {

console.log(props.producto.cantidad);

  return (
    <Box className='product'
    sx={{
      width: 350,
      height: 170,
       p: 4, 
       borderRadius: 1,
       m: 4

    }}
  >
      <h3>{props.producto.nombre}</h3>
      <p><b>Cantidad:</b>{props.producto.cantidad}</p>
      <p>Total: {props.producto.cantidad * props.producto.precio} €</p>
      <Button variant="contained"  sx={{color: '#fff', m:1}}>Eliminar</Button>
      </Box>
  );
}

export default Producto;