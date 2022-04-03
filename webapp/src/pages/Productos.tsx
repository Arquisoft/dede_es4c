import React, { useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Producto from "./Producto";
import Grid from '@mui/material/Grid';
import ProductoLista from './ProductoLista';
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
              {props.products.slice(numElements * (page - 1), (numElements * (page - 1)) + numElements).map((producto: Producto) =>(
                  <ProductoLista product = {producto}></ProductoLista>
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