import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import './styles/producto.css';
import { CartContext } from '../context/cartContext';
import Typography from '@mui/material/Typography';

function Producto(props: any) {

  const {removeToCart} = useContext(CartContext);

  const handleRemoveToCart = (id: string) => {
    removeToCart(id);
  }

  return (
   <Card className='cartItem' sx={{ maxHeight: 500 }}>    
   <CardMedia
        component="img"
        height="3"
        width="3"
        image={"pinchos/"+props.producto.nombre+".jpg"}
        alt="producto"
      />
   <CardContent>
      <Typography variant='h4'>
        {props.producto.nombre}
      </Typography>
      <Typography variant='body1'>
        Cantidad: {props.producto.cantidad} uds
      </Typography>
      <Typography variant='body1'>
        Total: {props.producto.cantidad * props.producto.precio} €
      </Typography>
    </CardContent>
    <CardActions>
    <Button id ={'deleteItem' + props.producto.id} className={'deleteItem' + props.producto.id} variant="contained"  sx={{color: '#fff', m:1}} onClick={() => handleRemoveToCart(props.producto.id)}>Eliminar</Button>
    </CardActions>
    </Card>
  );
}

export default Producto;