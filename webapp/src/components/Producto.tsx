import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './styles/producto.css';

function Producto() {

  return (
    <Box className='product'
    sx={{
      width: 250,
      height: 250,
       p: 4, 
       borderRadius: 1,
       m: 4

    }}
  >
      <h2>Producto ejemplo</h2>
      <p>Descripción del producto. Por ejemplo es un pincho de jamon con tomate</p>
      <Button variant="contained"  sx={{color: '#fff', m:1}}>Añadir al carro</Button>
      </Box>
  );
}

export default Producto;