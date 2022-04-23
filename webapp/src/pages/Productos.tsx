import React, { useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Producto from "./Producto";
import Grid from '@mui/material/Grid';
import ProductoLista from './ProductoLista';
import actualizaPinchos from '../components/CargaPinchos'
import {
  /* the components you used */
  Pagination
} from "@mui/material";

const numElements = 9;

function Productos(props:any){
    const [page, setPage] = React.useState(1);
    var lista: Producto[] = [];
    var numPages: number;
    lista = props.products;
    if(lista == undefined)
      lista = actualizaPinchos(props.filtro);
    if(lista.length < numElements)
      numPages = 1;
    else
      numPages = Math.round(lista.length / numElements) + 1;

    return(
        <div id='productos'>
          {<Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
              {lista.slice(numElements * (page - 1), (numElements * (page - 1)) + numElements).map((producto: Producto) =>(
                  <ProductoLista product = {producto}></ProductoLista>
              ))}
              </Grid>
          </Box>}
          <div id = "paginacion">
                <Pagination count={numPages} variant="outlined" color="primary" size="large" page = {page}
                onChange={(_, page) => {
                  setPage(page);
                }}></Pagination>
          </div>
          
        </div>
    )
  }

export default Productos;