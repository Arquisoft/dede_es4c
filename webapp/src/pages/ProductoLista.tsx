import React, { useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import Producto from "./Producto";
import Grid from '@mui/material/Grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { CartContext } from '../context/cartContext';

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

    return(
        <Grid item xs={4}>
        <h2> {props.product.nombre} </h2>
        <p>Precio: {props.product.precio} €</p>
        {
          !isInCart(props.product) &&
        <Button variant="contained" sx={{color: '#fff', m:1, backgroundColor: '#596886'}} endIcon={<AddCircleIcon />} onClick= {() => handleAddToCart(props.product)} >Añadir al carrito</Button>
        }
        {
          isInCart(props.product) &&
        <Button variant="contained" sx={{color: '#fff', m:1, backgroundColor: '#596886'}} endIcon={<AddCircleIcon />} onClick= {() => handleIncrease(props.product)} >Añadir más</Button>
        }
      </Grid>
    )

}

export default ProductoLista;