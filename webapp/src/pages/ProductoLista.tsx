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
import Avatar from '@mui/material/Avatar';
import picante from '../images/picante.png';
import vegetariano from '../images/vegetariano.jpg';
import Tooltip from '@mui/material/Tooltip';
import Detalles from '../components/DetallesProducto';

function ProductoLista(props:any){

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

    const esVegetariano = (producto: Producto) => {
      return producto.vegetariano;
    }

    const esPicante = (producto: Producto) => {
      return false;
    }

    return(
      <Grid item xs={4}>
      <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="20"
        width="20"
        image={"pinchos/"+props.product.nombre+".jpg"}
        alt="producto"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.product.nombre.charAt(0).toUpperCase()+props.product.nombre.slice(1)}
        </Typography>
        <Typography>
          { esPicante(props.product) &&
            <Tooltip title="Picante">
              <Avatar alt="Este pincho pica" src = {picante} sx={{ width: 25, height: 25 }}/>
            </Tooltip>
          }
          { esVegetariano(props.product) &&
          <Tooltip title="Vegetariano">
            <Avatar alt="Este pincho es válido para vegetarianos" src = {vegetariano} sx={{ width: 25, height: 25 }}/>
          </Tooltip>
          }
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
        <Detalles product = {props.product}></Detalles>
      </CardActions>
    </Card>
    </Grid>
    )

}

export default ProductoLista;