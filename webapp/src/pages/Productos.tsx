import React, { useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Producto from "./Producto";
import Grid from '@mui/material/Grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  /* the components you used */
  Pagination
} from "@mui/material";
import { CartContext } from '../context/cartContext';


const numElements = 9;




function Productos(props:any){
    const [page, setPage] = React.useState(1);

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
        <div id='productos'>
          {<Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
              {props.products.slice(numElements * (page - 1), (numElements * (page - 1)) + numElements).map((product: Producto) =>(
                  <Grid item xs={4}>
                    <h2> {product.nombre} </h2>
                    <p>Precio: {product.precio} €</p>
                    {
                      !isInCart(product) &&
                    <Button variant="contained" sx={{color: '#fff', m:1}} endIcon={<AddCircleIcon />} onClick= {() => handleAddToCart(product)} >Añadir al carrito</Button>
                    }
                    {
                      isInCart(product) &&
                    <Button variant="contained" sx={{color: '#fff', m:1}} endIcon={<AddCircleIcon />} onClick= {() => handleIncrease(product)} >Añadir más</Button>
                    }
                  </Grid>
              ))}
              </Grid>
          </Box>}
          <div id = "paginacion">
                <Pagination count={5} variant="outlined" color="primary" size="large" page = {page}
                onChange={(_, page) => {
                  setPage(page);
                }}></Pagination>
          </div>
        </div>
    )
  }

export default Productos;