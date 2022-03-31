import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import CartItem from './CartItem';
import Producto from "./Producto";
import { useCart } from '../hooks/useCart';
import { CartContext } from '../context/cartContext';
import { useContext } from 'react';
import { Button } from '@mui/material';



type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function TemporaryDrawer(props: any) {

  const {cartState} = useContext(CartContext);
  const {productos} = useCart();

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
        <Button variant="contained" >Realizar compra</Button>
        </Box>
     
    </Box>
  );



  return (
    <div>
        <React.Fragment key={'right'}>
        <IconButton size="large" onClick={toggleDrawer('right', true)}>
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
        </React.Fragment>
    </div>
  );
}