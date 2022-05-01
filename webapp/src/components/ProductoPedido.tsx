import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

function Producto(props: any) {
	var image = "";
	var titulo = "";
	var precioFinal = "";
	var imgAlt = "";
	if (props.producto === undefined) {
		image = "pinchos/nada.jpg";
		titulo = "Sin producto";
		precioFinal = "No hay precio";
		imgAlt = "Sin imagen";
	} else {
		image = "pinchos/" + props.producto.nombre + ".jpg";
		titulo = props.producto.nombre + "(" + props.producto.cantidad + " uds.)";
		precioFinal =
			"Total: " +
			(props.producto.cantidad * props.producto.precio).toFixed(2) +
			"€";
		imgAlt = props.producto.nombre;
	}


	return (
		<List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
			<ListItem>
				<ListItemAvatar>
					<Avatar src={image} alt={imgAlt} sx={{ width: 50, height: 50 }} />
				</ListItemAvatar>
				<ListItemText primary={titulo} secondary={precioFinal} />
			</ListItem>
		</List>
	);
}

export default Producto;
