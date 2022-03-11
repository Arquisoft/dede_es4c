import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './styles/producto.css';
import { CartContext } from '../context/cartContext';

function Producto(props: any) {

  const {removeToCart} = useContext(CartContext);

  const handleRemoveToCart = (id: string) => {
    removeToCart(id);
  }

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
      <Button variant="contained"  sx={{color: '#fff', m:1}} onClick={() => handleRemoveToCart(props.producto.id)}>Eliminar</Button>
      </Box>
  );
}

export default Producto;