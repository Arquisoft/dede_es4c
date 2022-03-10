import React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Productos from "./Productos";
import Prueba from "./Producto";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalDrinkSharpIcon from '@mui/icons-material/LocalDrinkSharp';

const prod1 = new Prueba("Tortilla", 3);
const prod2 = new Prueba("Vegetal", 3.5);
const prod3 = new Prueba("Jamón", 3);
const prod4 = new Prueba("Lomo con queso", 3);
const prod5 = new Prueba("Bacon con queso", 3.5);
const prod6 = new Prueba("Especial", 5);
const prod7 = new Prueba("Pollo", 3);
const prod8 = new Prueba("Pollo con lechuga", 4);
const prod9 = new Prueba("Calamares", 4);
const prod10 = new Prueba("Cachopo de lomo", 3.5);
const prod11 = new Prueba("Agua", 1.5);
const prod12 = new Prueba("Coca-Cola", 2.5);
const prod13 = new Prueba("Nestea", 2.5);
const prod14 = new Prueba("Cerveza", 2);
const prod15 = new Prueba("Acuarius", 2.5);
const productosLista = [prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9, prod10, prod11, prod12, prod13, prod14, prod15];

const Tienda = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };

    return (
        <div id='listadoProducto'>
            <main>
                <h1>Artículos disponibles</h1>
                <TextField id="standard-basic" label="Buscar" variant="standard" size = "medium" sx={{ m: 1, width: '33ch' }}/> 
                <IconButton aria-label="Buscar" size="large">
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
                        <Button variant="contained" sx={{color: '#fff', m:1}} endIcon={<RestaurantIcon />} >Comida</Button>
                        <Button variant="contained" sx={{color: '#fff', m:1}} endIcon={<LocalDrinkSharpIcon />} >Bebida</Button>
                    </Menu>
            </main>
                <Productos products = {productosLista}></Productos>               
        </div>
    );
}

export default Tienda;