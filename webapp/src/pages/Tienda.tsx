import React, { useState, useEffect, useContext } from 'react';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Productos from "./Productos";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalDrinkSharpIcon from '@mui/icons-material/LocalDrinkSharp';
import Producto from './Producto';
import actualizaPinchos from '../components/CargaPinchos'

var listaTodos: Producto[] = [];
var listaComida: Producto[] = [];
var listaBebida: Producto[] = [];
var filtrado: string = "";
var soloComida: boolean = false;

export const listaPorDefecto: Producto[] = [];
  
  export const CarritoContext = React.createContext(
    listaPorDefecto
  );


function Tienda (props:any) {

    const [filtro, setFiltro] = React.useState("todos");

    listaTodos = actualizaPinchos(filtro);
    listaComida = actualizaPinchos("comida");
    listaBebida = actualizaPinchos("bebida");

   

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };

    const isTodos = () => {
        return filtro.localeCompare("todos") == 0;
    }

    const isComida = () => {
        return filtro.localeCompare("comida") == 0;
    }

    const isBebida = () => {
        return filtro.localeCompare("bebida") == 0;
    }

    const handleFilterComida = () => {
        setFiltro("comida");
    }

    const handleFilterBebida = () => {
        setFiltro("bebida");
    }

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
                        sx={{color: '#596886'}}
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
                        <Button variant="contained" sx={{color: '#fff', m:1, background: '#596886'}} endIcon={<RestaurantIcon />} onClick = {handleFilterComida}>Comida</Button>
                        <Button variant="contained" sx={{color: '#fff', m:1, background:'#596886'}} endIcon={<LocalDrinkSharpIcon />} onClick = {handleFilterBebida} >Bebida</Button>
                    </Menu>
            </main>
                {isTodos() &&
                <Productos products = {listaTodos}></Productos>     
                }   
                {isComida() &&
                <Productos products = {listaComida}></Productos>     
                }    
                {isBebida() &&
                <Productos products = {listaBebida}></Productos>     
                }   
        </div>
    );
}

export default Tienda;