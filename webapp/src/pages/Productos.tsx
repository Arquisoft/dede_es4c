import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Producto from "./Producto";
import Grid from '@mui/material/Grid';

function Productos(props:any){
    return(
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
        {props.products.map((product: Producto) =>(
            <Grid item xs={3}>
              <h2> {product.nombre} </h2>
              <p>Precio: {product.precio} €</p>
              <Button variant="contained" sx={{color: '#fff', m:1}}>Añadir al carrito</Button>
              </Grid>
        ))}
        </Grid>
        </Box>
    )
  }

export default Productos;