import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Producto from "./Producto";
import Grid from '@mui/material/Grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  /* the components you used */
  Pagination
} from "@mui/material";

const numElements = 9;


function Productos(props:any){
    const [page, setPage] = React.useState(1);

    return(
        <div id='productos'>
          {<Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
              {props.products.slice(numElements * (page - 1), (numElements * (page - 1)) + numElements).map((product: Producto) =>(
                  <Grid item xs={4}>
                    <h2> {product.nombre} </h2>
                    <p>Precio: {product.precio} €</p>
                    <Button variant="contained" sx={{color: '#fff', m:1}} endIcon={<AddCircleIcon />} >Añadir al carrito</Button>
                  </Grid>
              ))}
              </Grid>
          </Box>}
          <div id = "paginacion">
                <Pagination count={10} variant="outlined" color="primary" size="large" page = {page}
                onChange={(_, page) => {
                  setPage(page);
                }}></Pagination>
          </div>
        </div>
    )
  }

export default Productos;