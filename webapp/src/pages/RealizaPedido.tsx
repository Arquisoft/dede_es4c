import React, { useContext } from "react";
import Product from "../components/ProductoPedido";
import { useCart } from "../hooks/useCart";
import Divider from "@mui/material/Divider";
import { CartContext } from "../context/cartContext";
import { Button } from "@mui/material";
import axios from "axios";
import { UserContext } from "../context/userContext";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import PaidIcon from "@mui/icons-material/Paid";
import image from "../images/cajaRegistradora.png";
import { useNavigate } from "react-router-dom";

export default function RealizaPedido(props: any) {
	const { cartState, resetCart } = useContext(CartContext);
	const { productos } = useCart();
	const { stateUser } = useContext(UserContext);
	const [open, setOpen] = React.useState(false);
	const [message, setMessage] = React.useState("Se ha realizado el pedido");
	const navigate = useNavigate();
	var precio = cartState.total;

	const handlePedido = () => {
		var direccion = {
			street1: stateUser.userData.street1,
			city: stateUser.userData.city,
			state: stateUser.userData.state,
			zip: stateUser.userData.zip,
			country: stateUser.userData.country,
		};
		var fecha = Date.now();
		var precio = cartState.total;
		if (precio === 0) {
			setMessage(
				"La cesta está vacía, añade los productos y vuelve para finalizar",
			);
			setOpen(true);
			return;
		}

		if (!stateUser.isAuthenticated) {
			setMessage("Debes iniciar sesión para realizar el pedido");
			setOpen(true);
			return;
		}
		var cliente = stateUser.user._id;
		if (cliente === "") {
			setMessage("Debes iniciar sesión para realizar el pedido");
			setOpen(true);
			return;
		}
		if (!stateUser.isAuthenticated) {
			setMessage("Debe iniciar sesión");
			setOpen(true);
		} else if (!stateUser.info.isLoggedIn) {
			setMessage("Debe vincular su pod");
			setOpen(true);
		} else if (stateUser.userData.email === "") {
			setMessage("Debe rellenar los datos de su pod");
			setOpen(true);
		}

		var productosCarrito: Record<string, string> = {};
		for (let i = 0; i < cartState.productos.length; i++) {
			productosCarrito[cartState.productos[i].id] =
				cartState.productos[i].cantidad + "";
		}

		axios
			.post("http://localhost:5000/api/orders/add", {
				cliente,
				direccion,
				precio,
				productosCarrito,
				fecha,
			})
			.then((res) => {
				if (res.status === 200) {
					resetCart();
					setOpen(true);
					navigate("/Pedidos");
				}
			})
			.catch((error) => {
				console.log("Se ha producido un error inesperado");
				setOpen(true);
				console.log(error);
			});
	};

	const handleClose = (
		event: React.SyntheticEvent | Event,
		reason?: string,
	) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	const action = (
		<React.Fragment>
			<IconButton
				className="cerrar"
				size="small"
				aria-label="close"
				color="inherit"
				onClick={handleClose}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	);

	return (
		<div id="pedFin">
			<main>
				<h1>Pedido Final</h1>
				<div id="prods">
					{productos.map((product) => (
						<Product producto={product} />
					))}
				</div>
				<Divider />
				<h2>Total a pagar: {precio}€</h2>
				<Button
					onClick={handlePedido}
					endIcon={<PaidIcon />}
					sx={{ bgcolor: "#596886", color: "#fff", my: 2 }}
					variant="contained"
				>
					Realizar compra
				</Button>
			</main>
			<aside>
				<img src={image} alt="caja registradora"></img>
			</aside>
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				message={message}
				action={action}
			/>
		</div>
	);
}
