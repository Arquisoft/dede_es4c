import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './styles/producto.css';

function Producto() {

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
      <h3>Producto ejemplo</h3>
      <p><b>Cantidad:</b> 5</p>
      <p>5 euros</p>
      <Button variant="contained"  sx={{color: '#fff', m:1}}>Eliminar</Button>
      </Box>
  );
}

export default Producto;