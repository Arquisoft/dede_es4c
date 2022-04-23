import React from 'react';
import image from '../images/Equipo_02.png';
import hugo from '../images/avatares/Hugo.jpeg';
import dani from '../images/avatares/Dani.jpg';
import marcos from '../images/avatares/Marcos.jpg';
import sergio from '../images/avatares/Sergio.jpeg';
//import damir from '../images/avatares/Damir.jpeg';
import Avatar from '@mui/material/Avatar';

const Historia = () => {
    return (
        <div>
        <div id='historia'>
        <main>
            <h1>Sobre nosotros.</h1>
            <p>Dede es una tienda de comida desarrollada con REACT y Nodejs que hace uso de SOLID para asegurar al usuario la privacidad y la seguridad de sus datos.</p>
        </main>
        <aside>
            <img src={image}></img>
        </aside>
        </div>
        <section id = 'desarrolladores'>
            <h2>Desarrolladores de la tienda:</h2>
                <p id="dani">Daniel Ferreira Gómez - UO277603</p>
                <Avatar alt="Foto de Daniel Ferreira Gómez" src = {dani} sx={{ width: 56, height: 56 }}/>
                <p>Damir Abdrafikov - UO277306</p>
                <Avatar alt="Foto de Damir Abdrafikov" src = "ponerFoto" sx={{ width: 56, height: 56 }}/>
                <p>Sergio Castillo - UO276436</p>
                <Avatar alt="Foto de Sergio Castillo" src = {sergio} sx={{ width: 56, height: 56 }}/>
                <p>Marcos Caraduje - UO270285</p>
                <Avatar alt="Foto de Marcos Caraduje" src = {marcos} sx={{ width: 56, height: 56 }}/>
                <p>Hugo Gutiérrez Tomás - UO277891</p>
                <Avatar alt="Foto de Hugo Gutiérrez Tomás" src = {hugo} sx={{ width: 56, height: 56 }}/>
            </section>
        </div>
        
    );
}

export default Historia;