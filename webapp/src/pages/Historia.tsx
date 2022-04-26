import React from 'react';
import image from '../images/Equipo_02.png';
import hugo from '../images/avatares/Hugo.jpeg';
import dani from '../images/avatares/Dani.jpg';
import marcos from '../images/avatares/Marcos.jpg';
import sergio from '../images/avatares/Sergio.jpeg';
//import damir from '../images/avatares/Damir.jpeg';
import MiembroAvatar from '../components/MiembroAvatar';

class Miembro {
    nombre: string;
    imagen: Object;
    uo: string

    constructor(nombre:string, imagen:Object, uo:string){
        this.nombre = nombre;
        this.imagen = imagen;
        this.uo = uo;
    }
}

const Historia = () => {
    var miembros: Miembro[] = [];
    miembros[0] = new Miembro("Daniel Ferreira Gómez", dani, "UO277603");
    miembros[1] = new Miembro("Damir Abdrafikov", marcos, "UO277306");
    miembros[2] = new Miembro("Sergio Castillo", sergio, "UO276436");
    miembros[3] = new Miembro("Hugo Gutiérrez Tomás", hugo, "UO277891");
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
                {miembros.map((member) =>(
                    <MiembroAvatar miembro={member}/>
                ))}
            </section>
        </div>
        
    );
}

export default Historia;