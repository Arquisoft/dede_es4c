import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import "./styles/login.css";
import { UserContext } from "../context/userContext";
import foto from "../images/user.png";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Token } from "../interface/interfaces";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const Login = () => {
	const { setCurrentUser, logoutUser } = useContext(UserContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const apiEndPoint = process.env.REACT_APP_API_URI || 'https://localhost:5000/api';

	const userLogin = () => {
		axios
			.post(apiEndPoint + '/login', {
				email,
				password,
			})
			.then((res) => {
				if (res.status === 200) {
					setToken(res.data.token);
					navigate("/Perfil");
				} else {
					setError(res.data.err.message);
					logoutUser();
				}
			})
			.catch((_e) => {
				setError("Las credenciales no son correctas");
				logoutUser();
			});
	};

	const setToken = (token: string) => {
		localStorage.setItem("jwt", token);
		var token_decoded = jwt_decode<Token>(token);
		setError("");
		setCurrentUser(token_decoded.user);
	};

	const submit = (e: { preventDefault: () => void }) => {
		e.preventDefault();

		if (email === "" || password === "") {
			setError("Rellene los datos solicitados correctamente");
		} else {
			userLogin();
		}
	};

	return (
		<div>
			<div id="formLogin">
				<img src={foto} alt="icono login"></img>
				<h1>Login</h1>
				<form name="login" onSubmit={submit}>
					<TextField
						className="textfield"
						name="email"
						label="Email"
						variant="outlined"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
					<TextField
						type="password"
						className="textfield"
						name="password"
						label="Password"
						variant="outlined"
						onChange={(passwd) => setPassword(passwd.target.value)}
						value={password}
					/>
					<br />
					<Button
						onClick={submit}
						variant="contained"
						sx={{ bgcolor: "#596886", color: "#fff" }}
					>
						Enviar
					</Button>
					{error ? <Alert severity="error">{error}</Alert> : null}
				</form>
				<p>
					¿No tienes uno todavía? <br />
					<a href="/Signup">Crea uno ahora</a>
				</p>
			</div>
		</div>
	);
};

export default Login;
