import React, { useCallback, useEffect, useState } from "react";
import image from "../images/Equipo_02.png";
import MiembroAvatar from "../components/MiembroAvatar";
import { Miembro } from "../interface/interfaces";
import { getMiembros } from "../api/api";

const miembrosDefecto: Miembro[] = [];

const Historia = () => {
	const [miembros, setMiembros] = useState(miembrosDefecto);

	const getMiembrosBd = useCallback(async () => {
		setMiembros(await getMiembros());
	}, []);

	useEffect(() => {
		getMiembrosBd();
		console.log(miembros)
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
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
					<img src={image} alt="imagen equipo"></img>
				</aside>
			</div>
			<section id="desarrolladores">
				<h2>Desarrolladores de la tienda:</h2>
				{miembros.map((member) => (
					<MiembroAvatar key={member.uo} miembro={member} />
				))}
			</section>
		</div>
	);
};

export default Historia;
