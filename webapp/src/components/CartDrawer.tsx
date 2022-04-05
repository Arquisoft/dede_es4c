import React, {useEffect, useContext} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import CartItem from './CartItem';
import {Producto} from "../interface/interfaces";
import { useCart } from '../hooks/useCart';
import { CartContext } from '../context/cartContext';
import { Button } from '@mui/material';
import { UserContext } from "../context/userContext";
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';



type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function TemporaryDrawer(props: any) {

  const {cartState, addToCart} = useContext(CartContext);
  const {productos} = useCart();

  const {stateUser} = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("Se ha realizado el pedido")
  

useEffect(() => {
  if(props.products.length > 0){
    props.products.map((producto: Producto) => {
      console.log(producto)
      addToCart({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1
      });
    });
  }
}, []);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const handlePedido = () => {
    var cliente = stateUser.user._id;
    if(cliente === ''){
      setMessage("Debes iniciar sesión para realizar el pedido");
      setOpen(true);
      return;
    }
    var direccion = "Avda. Galicia 62";
    var precio = cartState.total;
    if(precio === 0){
      setMessage("No se ha podido realizar el pedido");
      setOpen(true);
      return;
    }

    var productosCarrito: Record<string, string> = {};
    for(let i = 0; i < cartState.productos.length; i++){
      productosCarrito[cartState.productos[i].id] = cartState.productos[i].cantidad + "";
    }

    axios.post('http://localhost:5000/api/orders/add',{
      cliente, direccion, precio, productosCarrito
    }).then( res => {
      if(res.status === 200){
        console.log("Pedido realizado")
        setOpen(true);
      }
    }).catch(error => {
      console.log(error);
    })
  };

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    
    <Box
      sx={{ width: 400 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography textAlign="center">Carrito</Typography>
      <Divider/>
      <Typography textAlign="center">{productos.length === 0 ? "La cesta está vacía" : ''}</Typography>
     {productos.map((product) =>(
           <CartItem producto={product}/>
        ))}
        <Box textAlign="center">
        <Typography >{'Total del importe: ' + cartState.total.toFixed(2) + " €"}</Typography>
        <Button onClick={handlePedido} variant="contained" >Realizar compra</Button>
        </Box>
     
    </Box>
  );

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
        <React.Fragment key={'right'}>
        <IconButton size="large" onClick={toggleDrawer('right', true)} className='buttonCart'>
          <AddShoppingCartIcon fontSize="inherit" sx={{ color: "#fff" }} />
          </IconButton>
          <Drawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
            variant='temporary'
          >
            {list('right')}
          </Drawer>
          <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={message}
                    action={action}
                  />
        </React.Fragment>
    </div>
  );
}