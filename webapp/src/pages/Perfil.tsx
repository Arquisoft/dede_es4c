import React, { useContext, useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import { UserContext } from "../context/userContext";
import "./styles/profile.css";
import Button from "@mui/material/Button";
import { handleIncomingRedirect } from "@inrupt/solid-client-authn-browser";
import { getUserInfo, setUserInfo } from "../utils/solid";
import TextField from "@mui/material/TextField";
import { LoginButton, useSession } from "@inrupt/solid-ui-react";

import { InfoPod } from "../interface/interfaces";

const Perfil = () => {
	const { stateUser, setInfo, setUserData } = useContext(UserContext);

	const { session } = useSession();
	const { webId } = session.info;
	//const [userData, setUserData] = useState({email:"", address:"", phone:""});
	const [isEditing, setEditing] = useState(false);

	const [email, setEmail] = useState("");
	const [address] = useState("");
	const [phone, setPhone] = useState("");
	const [street1, setStreet1] = useState("");
	const [city, setCity] = useState("");
	//const [state, setState] = useState("");
	const [zip, setZip] = useState("");
	const [country, setCountry] = useState("");

	const idp = "https://broker.pod.inrupt.com";
	const redirUrl = "http://localhost:3000/Perfil";

	useEffect(() => {
		handleIncomingRedirect({
			restorePreviousSession: true,
		}).then((info) => {
			console.log("iniciado sesion as " + info?.webId);
			setInfo(info as InfoPod);
			const getUserData = async () => {
				let data = await getUserInfo(session, info?.webId!);
				setUserData(data);
			};
			getUserData();
		});
	}, [session, setInfo, setUserData]);

	async function saveUserInfo() {
		let data = {
			name: stateUser.user._username,
			email: email === "" ? stateUser.userData.email : email,
			phone: phone === "" ? stateUser.userData.phone : phone,
			address: address === "" ? stateUser.userData.address : address,
			street1: street1 === "" ? stateUser.userData.street1 : street1,
			city: city === "" ? stateUser.userData.city : city,
			country: country === "" ? stateUser.userData.country : country,
			zip: zip === "" ? stateUser.userData.zip : zip,
		};
		await setUserInfo(data, session, webId!);
		setEditing(false);
	}

	const alternEditing = () => {
		if (isEditing) {
			setEditing(false);
		} else {
			setEditing(true);
		}
	};

	return (
		<div id="profile">
			{!session.info.isLoggedIn && (
				<Tooltip title="No podemos coger su información hasta que no vincules tu POD">
					<Alert className="alert" severity="error">
						POD no vinculado
					</Alert>
				</Tooltip>
			)}
			{session.info.isLoggedIn && (
				<Alert className="alert" severity="success">
					POD vinculado
				</Alert>
			)}
			<Card className="card">
				<CardContent className="content">
					<Typography className={"username"} variant={"h3"} gutterBottom>
						{stateUser.user._username}
					</Typography>
					<Avatar className="avatar" sx={{ width: 250, height: 250 }} />
					<Divider className="divider" />
					{!session.info.isLoggedIn && (
						<Alert
							className="infoPod"
							severity="info"
							variant="outlined"
							sx={{ m: 5 }}
							icon={false}
						>
							Por favor, conéctate con tu POD para que podamos utilizar tus
							datos
						</Alert>
					)}
					{!isEditing && session.info.isLoggedIn && (
						<Typography className={"email"} variant={"h6"}>
							<b>Email:</b> {stateUser.userData.email}
						</Typography>
					)}
					{isEditing && (
						<TextField
							className="textfield"
							name="email"
							label="Email"
							variant="outlined"
							onChange={(e) => setEmail(e.target.value)}
							sx={{ m: 3 }}
							defaultValue={stateUser.userData.email}
						/>
					)}
					{!isEditing && session.info.isLoggedIn && (
						<Typography className={"street"} variant={"h6"}>
							<b>Calle:</b> {stateUser.userData.street1}
						</Typography>
					)}

					{isEditing && (
						<TextField
							className="textfield"
							name="street1"
							label="Calle"
							variant="outlined"
							onChange={(e) => setStreet1(e.target.value)}
							sx={{ m: 3 }}
							defaultValue={stateUser.userData.street1}
						/>
					)}

					{!isEditing && session.info.isLoggedIn && (
						<Typography className={"city"} variant={"h6"}>
							<b>Ciudad:</b> {stateUser.userData.city}
						</Typography>
					)}
					{isEditing && (
						<TextField
							className="textfield"
							name="city"
							label="Ciudad"
							variant="outlined"
							onChange={(e) => setCity(e.target.value)}
							sx={{ m: 3 }}
							defaultValue={stateUser.userData.city}
						/>
					)}

					{!isEditing && session.info.isLoggedIn && (
						<Typography className={"zip"} variant={"h6"}>
							<b>Código postal:</b> {stateUser.userData.zip}
						</Typography>
					)}
					{isEditing && (
						<TextField
							className="textfield"
							name="zip"
							label="Código postal"
							variant="outlined"
							onChange={(e) => setZip(e.target.value)}
							sx={{ m: 3 }}
							defaultValue={stateUser.userData.zip}
						/>
					)}

					{!isEditing && session.info.isLoggedIn && (
						<Typography className={"counrty"} variant={"h6"}>
							<b>País:</b> {stateUser.userData.country}
						</Typography>
					)}
					{isEditing && (
						<TextField
							className="textfield"
							name="country"
							label="País"
							variant="outlined"
							onChange={(e) => setCountry(e.target.value)}
							sx={{ m: 3 }}
							defaultValue={stateUser.userData.country}
						/>
					)}

					{!isEditing && session.info.isLoggedIn && (
						<Typography className={"phone"} variant={"h6"}>
							<b>Teléfono:</b> {stateUser.userData.phone}
						</Typography>
					)}
					{isEditing && (
						<TextField
							className="textfield"
							name="phone"
							label="Teléfono"
							variant="outlined"
							onChange={(e) => setPhone(e.target.value)}
							sx={{ m: 3 }}
							defaultValue={stateUser.userData.phone}
						/>
					)}
				</CardContent>
			</Card>
			{session.info.isLoggedIn && (
				<Button onClick={alternEditing} variant="contained" sx={{ m: 4 }}>
					{isEditing ? "Dejar de editar" : "Editar perfil"}
				</Button>
			)}
			{isEditing && (
				<Button onClick={saveUserInfo} variant="contained" sx={{ m: 4 }}>
					Guardar cambios
				</Button>
			)}
			{!session.info.isLoggedIn && (
				<LoginButton
					authOptions={{ clientName: "dede_es4c" }}
					oidcIssuer={idp}
					redirectUrl={redirUrl}
					onError={console.error}
				>
					<Button variant="contained" sx={{ bgcolor: "#596886", m: 3 }}>
						Entra con tu POD
					</Button>
				</LoginButton>
			)}
		</div>
	);
};

export default Perfil;
