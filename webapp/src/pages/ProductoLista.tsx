import React, { useContext, useEffect } from 'react';
import Producto from "./Producto";
import Grid from '@mui/material/Grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { CartContext } from '../context/cartContext';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import pinchoEstatico from '../images/pincho2.jpg';
import cabecera from '../images/cabecera.jpg';
import Avatar from '@mui/material/Avatar';
import picante from '../images/picante.png';
import vegetariano from '../images/vegetariano.jpg';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

function ProductoLista(props:any){

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
    sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
    role="presentation"
    onClick={toggleDrawer(anchor, false)}
    onKeyDown={toggleDrawer(anchor, false)}
  >
    <img id = "detalles" src={cabecera}/>
      <Typography textAlign="center" gutterBottom variant="h2" component="div">
          {props.product.nombre}
        </Typography>
        <Divider></Divider>
        <Typography textAlign="center" gutterBottom variant="h4" color = "#000034" component="div">
            Descripción:
        </Typography>
        <Typography textAlign="center" gutterBottom variant="h5" component="div">
          Pincho de pollo de corral, acompañado de lechuga fresca y pan.
        </Typography>
        <Typography textAlign="center" gutterBottom variant="h4" color = "#000034" component="div">
            Ingredientes:
        </Typography>
        <Typography textAlign="center" gutterBottom variant="h5" component="div">
            - Pan
        </Typography>
        <Typography textAlign="center" gutterBottom variant="h5" component="div">
            - Pollo
        </Typography>
        <Typography textAlign="center" gutterBottom variant="h5" component="div">
            - Lechuga
        </Typography>
        <Divider></Divider>
        <Typography textAlign="center" variant="body2" color="text.secondary">
          Precio: {props.product.precio} €
        </Typography>
    
  </Box>
);

    const {addToCart, increase, cartState} = useContext(CartContext);

    const {productos} = cartState;

    const handleAddToCart = (producto: Producto) => {
        addToCart({
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: 1
        });
      }
  
      const handleIncrease = (producto: Producto) => {
        increase({
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: 1
        });
      }

    const isInCart = (producto: Producto) => {
        let id = producto.id;
        if(productos.find(item => item.id === id) != undefined){
          return true;
        }
        return false;
    }

    return(
      <Grid item xs={4}>
      <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="20"
        image={pinchoEstatico}
        alt="producto"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.product.nombre}
        </Typography>
        <Typography>
          <Tooltip title="Picante">
            <Avatar alt="Este pincho pica" src = {picante} sx={{ width: 25, height: 25 }}/>
          </Tooltip>
          <Tooltip title="Vegetariano">
            <Avatar alt="Este pincho es válido para vegetarianos" src = {vegetariano} sx={{ width: 25, height: 25 }}/>
          </Tooltip>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Precio: {props.product.precio} €
        </Typography>
      </CardContent>
      <CardActions>
        {
          !isInCart(props.product) &&
        <Button variant="contained" sx={{color: '#fff', m:1, backgroundColor: '#596886'}} endIcon={<AddCircleIcon />} onClick= {() => handleAddToCart(props.product)} >Añadir al carrito</Button>
        }
        {
          isInCart(props.product) &&
        <Button variant="contained" sx={{color: '#fff', m:1, backgroundColor: '#596886'}} endIcon={<AddCircleIcon />} onClick= {() => handleIncrease(props.product)} >Añadir más</Button>
        }
        <div>
        <React.Fragment key={'top'}>
        <Button variant="contained" sx={{color: '#fff', m:1, backgroundColor: '#581845'}} endIcon={<InfoIcon />} onClick={toggleDrawer('top', true)} >Detalles producto</Button>
          <Drawer
            anchor={'top'}
            open={state['top']}
            onClose={toggleDrawer('top', false)}
            variant='temporary'
          >
            {list('top')}
          </Drawer>
        </React.Fragment>
        </div>
      </CardActions>
    </Card>
    </Grid>
    )

}

export default ProductoLista;