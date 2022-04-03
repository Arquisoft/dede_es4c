import React, { useState, useEffect, useContext } from 'react';

import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Productos from "./Productos";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalDrinkSharpIcon from '@mui/icons-material/LocalDrinkSharp';
import Producto from './Producto';
import actualizaPinchos from '../components/CargaPinchos';
import CakeIcon from '@mui/icons-material/Cake';
import GrassIcon from '@mui/icons-material/Grass';
import FlutterDashIcon from '@mui/icons-material/FlutterDash';

import { UserContext } from '../context/userContext';
import { InfoPod } from '../interface/interfaces';

var listaTodos: Producto[] = [];
var listaComida: Producto[] = [];
var listaBebida: Producto[] = [];
var listaVeg: Producto[] = [];
var listaNoVeg: Producto[] = [];
var filtrado: string = "";
var soloComida: boolean = false;

export const listaPorDefecto: Producto[] = [];
  
  export const CarritoContext = React.createContext(
    listaPorDefecto
  );


function Tienda (props:any) {

    const [filtro, setFiltro] = React.useState("todos");

    const [nombre, setNombre] = React.useState('');

    listaTodos = actualizaPinchos(filtro);
    listaComida = actualizaPinchos("comida");
    listaBebida = actualizaPinchos("bebida");

    const { stateUser, setInfo } = useContext(UserContext);

    listaVeg = actualizaPinchos("veg");
    listaNoVeg = actualizaPinchos("noveg");
   

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };

    const isTodos = () => {
        return !isComida() && !isBebida() && !isNombre() && !isVeg() && !isNoVeg();
    }

    const isComida = () => {
        return filtro.localeCompare("comida") == 0;
    }

    const isBebida = () => {
        return filtro.localeCompare("bebida") == 0;
    }

    const isVeg = () => {
        return filtro.localeCompare("veg") == 0;
    }

    const isNoVeg = () => {
        return filtro.localeCompare("noveg") == 0;
    }

    const isNombre = () =>{
        return filtro.localeCompare(nombre) == 0;
    }

    const handleFilterComida = () => {
        setFiltro("comida");
    }

    const handleFilterBebida = () => {
        setFiltro("bebida");
    }

    const handleFilterPostre = () => {
        setNombre("postre");
        setFiltro("postre");
    }

    const handleFilterVegetariano = () => {
        setFiltro("veg");
    }

    const handleFilterNoVegetariano = () => {
        setFiltro("noveg");
    }

    const handleFilterNombre = () => {
        setFiltro(nombre);
    }

    const handleInputChange = (e: any) => {
        setNombre(e.target.value);
    }

		


    return (

        <div id='listadoProducto'>
            <main>
                <h1>Artículos disponibles</h1>
                <Input placeholder="Buscar" value = {nombre} />
                <IconButton aria-label="Buscar" size="large" onClick={handleFilterNombre}>
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
                        <Button variant="contained" sx={{color: '#fff', m:1, background:'#596886'}} endIcon={<CakeIcon />} onClick = {handleFilterPostre} >Postres</Button>
                        <Button variant="contained" sx={{color: '#fff', m:1, background:'#596886'}} endIcon={<GrassIcon />} onClick = {handleFilterVegetariano} >Vegetarianos</Button>
                        <Button variant="contained" sx={{color: '#fff', m:1, background:'#596886'}} endIcon={<FlutterDashIcon />} onClick = {handleFilterNoVegetariano} >No Vegetarianos</Button>
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
                {isVeg() &&
                <Productos products = {listaVeg}></Productos>     
                }
                {isNoVeg() &&
                <Productos products = {listaNoVeg}></Productos>     
                }
                {isNombre() &&
                <Productos filtro = {nombre + ""}></Productos>     
                }      
        </div>
    );
}

export default Tienda;