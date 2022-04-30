import React, { useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CartItem from './CartItem';
import { Producto } from "../interface/interfaces";
import { useCart } from '../hooks/useCart';
import { CartContext } from '../context/cartContext';
import { Button } from '@mui/material';
import { UserContext } from "../context/userContext";
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';



type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function TemporaryDrawer(props: any) {

  const { cartState, addToCart } = useContext(CartContext);
  const { productos } = useCart();

  const { stateUser } = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("Se ha realizado el pedido")
  const navigate = useNavigate();
  useEffect(() => {
    if (props.products.length > 0) {
      props.products.map((producto: Producto) => {
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

    const handleRealizaPedido = () => {
        setState({ ...state, ['right']: false });
        navigate("/RealizaPedido");
    }

  const list = (anchor: Anchor) => (

    <Box
      sx={{ width: 400 }}
      role="presentation">
      <Typography textAlign="center">Carrito</Typography>
      <Divider />
      <Typography textAlign="center">{productos.length === 0 ? "La cesta está vacía" : ''}</Typography>
      {productos.map((product) => (
        <CartItem producto={product} />
      ))}
      <Box textAlign="center">
        <Typography >{'Total del importe: ' + cartState.total.toFixed(2) + " €"}</Typography>
        <Button onClick={handleRealizaPedido} sx={{ bgcolor: '#596886', color: '#fff', my: 2 }} variant='contained'>Pasar por caja</Button>
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
        <IconButton id='botonCarrito' size="large" onClick={toggleDrawer('right', true)} className='buttonCart'>
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