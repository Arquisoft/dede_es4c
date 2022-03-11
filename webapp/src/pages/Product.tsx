import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


function Producto(props:any){

  return(
    <Box className='product'
    sx={{
      width:250,
      height:250,
      p: 4,
      borderRadius: 1,
      m: 4
    }}
    >
      <h2> {props.nombre} </h2>
      <p>Precio: {props.precio} €</p>
      <Button variant="contained" sx={{color: '#fff', m:1}}>Añadir al carrito</Button>
    </Box>
  )
}

export default Producto;