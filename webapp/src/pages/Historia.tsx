import React from 'react';
import image from '../images/Equipo_02.png';

const Historia = () => {
    return (
        <div id='historia'>
        <main>
            <h1>Sobre nosotros.</h1>
            <p>DeDe es una tienda descentralizada cuyo propósito principal es llevar a tu casa la comida que quieras.</p>
        </main>
        <aside>
            <img src={image}></img>
        </aside>
        </div>
    );
}

export default Historia;