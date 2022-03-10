import React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Productos from "./Productos";
import Prueba from "./Producto";

const prod1 = new Prueba("Tortilla", 3);
const prod2 = new Prueba("Vegetal", 3.5);
const prod3 = new Prueba("Jamón", 3);
const prod4 = new Prueba("Lomo con queso", 3);
const prod5 = new Prueba("Bacon con queso", 3.5);
const prod6 = new Prueba("Especial", 5);
const prod7 = new Prueba("Pollo", 3);
const prod8 = new Prueba("Pollo con lechuga", 4);
const productosLista = [prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod8, prod8, prod8, prod8, prod8, prod8, prod8, prod8, prod8, prod8, prod8, prod8, prod8, prod8];

const Tienda = () => {
    return (
        <div id='listadoProducto'>
            <main>
                <h1>Artículos disponibles</h1>
                <TextField id="standard-basic" label="Buscar" variant="standard" size = "medium" sx={{ m: 1, width: '33ch' }}/> 
                <IconButton aria-label="Buscar" size="large">
                <SearchIcon fontSize="large" />
                </IconButton>
                </main>
                <Productos products = {productosLista}></Productos>               
        </div>
    );
}

export default Tienda;