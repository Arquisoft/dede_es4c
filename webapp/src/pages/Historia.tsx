import React from "react";
import image from "../images/Equipo_02.png";
import hugo from "../images/avatares/Hugo.jpeg";
import dani from "../images/avatares/Dani.jpg";
import damir from "../images/avatares/Damir.jpg";
import sergio from "../images/avatares/Sergio.jpeg";
import MiembroAvatar from "../components/MiembroAvatar";
import { Miembro } from "../interface/interfaces";

const Historia = () => {
	var miembros: Miembro[] = [
		{ nombre: "Daniel Ferreira Gómez", imagen: dani, uo: "UO277603" },
		{ nombre: "Damir Abdrafikov", imagen: damir, uo: "UO277306" },
		{ nombre: "Sergio Castillo", imagen: sergio, uo: "UO276436" },
		{ nombre: "Hugo Gutiérrez Tomás", imagen: hugo, uo: "UO277891" },
	];
	return (
		<div>
			<div id="historia">
				<main>
					<h1>Sobre nosotros.</h1>
					<p>
						Dede es una tienda de comida desarrollada con REACT y Nodejs que
						hace uso de SOLID para asegurar al usuario la privacidad y la
						seguridad de sus datos.
					</p>
				</main>
				<aside>
					<img src={image}></img>
				</aside>
			</div>
			<section id="desarrolladores">
				<h2>Desarrolladores de la tienda:</h2>
				{miembros.map((member) => (
					<MiembroAvatar miembro={member} />
				))}
			</section>
		</div>
	);
};

export default Historia;
