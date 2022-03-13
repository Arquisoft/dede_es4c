import React, { useState, useEffect, useContext } from 'react';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Productos from "./Productos";
import Prueba from "./Producto";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalDrinkSharpIcon from '@mui/icons-material/LocalDrinkSharp';
import Producto from './Producto';
import { getPinchos } from '../api/api';
import { getPinchoComida } from '../api/api';
import { getPinchoById } from '../api/api';
import {Pincho} from '../shared/shareddtypes';
import actualizaPinchos from '../components/CargaPinchos'


const prod1 = new Prueba('1',"Tortilla", 3, 1);
const prod2 = new Prueba('2',"Vegetal", 3.5, 1);
const prod3 = new Prueba('3',"Jamón", 3, 1);
const prod4 = new Prueba('4',"Lomo con queso", 3, 1);
const prod5 = new Prueba('5',"Bacon con queso", 3.5, 1);
const prod6 = new Prueba('6',"Especial", 5, 1);
const prod7 = new Prueba('7',"Pollo", 3, 1);
const prod8 = new Prueba('8',"Pollo con lechuga", 4, 1);
const prod9 = new Prueba('9',"Calamares", 4, 1);
const prod10 = new Prueba('10',"Cachopo de lomo", 3.5, 1);
const prod11 = new Prueba('11',"Agua", 1.5, 1);
const prod12 = new Prueba('12',"Coca-Cola", 2.5, 1);
const prod13 = new Prueba('13',"Nestea", 2.5, 1);
const prod14 = new Prueba('14',"Cerveza", 2, 1);
const prod15 = new Prueba("15","Acuarius", 2.5, 1);
const productosLista = [prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9, prod10, prod11, prod12, prod13, prod14, prod15];
var productosReales: Producto[] = [];
var filtrado: string = "";
var soloComida: boolean = false;

export const listaPorDefecto: Producto[] = [];
  
  export const CarritoContext = React.createContext(
    listaPorDefecto
  );


function Tienda (props:any) {

    //const [filtrado, setFiltrado] = React.useState();

    productosReales = actualizaPinchos("todos");

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };

    console.log(props.items);
    return (

        <div id='listadoProducto'>
            <main>
                <h1>Artículos disponibles</h1>
                <TextField id="filtrado" label="Buscar" variant="standard" size = "medium" sx={{ m: 1, width: '33ch' }} /> 
                <IconButton aria-label="Buscar" size="large" onClick = {() => {soloComida = true;}}>
                <SearchIcon fontSize="large" />
                </IconButton>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        size = "large"
                        onClick={handleClick}
                    >
                        <h2 id = "filtro">Filtros</h2>
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <Button variant="contained" sx={{color: '#fff', m:1}} endIcon={<RestaurantIcon />} onChangeCapture = {(_) => <p>Hola</p>}>Comida</Button>
                        <Button variant="contained" sx={{color: '#fff', m:1}} endIcon={<LocalDrinkSharpIcon />} >Bebida</Button>
                    </Menu>
            </main>
                <Productos products = {productosReales}></Productos>               
        </div>
    );
}

function hola(tipo: string){
    productosReales = actualizaPinchos("comida");
}

export default Tienda;