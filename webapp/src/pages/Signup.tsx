import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./styles/signup.css";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { UserContext } from "../context/userContext";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { Token } from "../interface/interfaces";
import { Link } from "react-router-dom";

const Signup = () => {
	const { setCurrentUser, logoutUser } = useContext(UserContext);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api';

	const userSignup = () => {
		axios
			.post(apiEndPoint + '/signup', {
				username,
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
				setError("Se ha producido un error");
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
		if (
			username === "" ||
			email === "" ||
			password === "" ||
			repeatPassword === ""
		) {
			setError("Rellene los datos solicitados correctamente");
		} else if (
			!email.includes("@") ||
			(!email.endsWith(".com") && !email.endsWith(".es"))
		) {
			setError("Introduzca un email válido");
		} else if (password !== repeatPassword) {
			setError("Las contraseñas no coinciden");
		} else if (password.length < 6) {
			setError("La contraseña debe tener al menos 6 caracteres");
		} else {
			userSignup();
		}
	};

	return (
		<div id="signupView">
			<div id="form">
				<h1>Sign Up</h1>
				<form name="Signup">
					<TextField
						className="textfield"
						name="username"
						label="User name"
						variant="outlined"
						onChange={(u) => setUsername(u.target.value)}
						value={username}
					/>
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
						onChange={(p) => setPassword(p.target.value)}
						value={password}
					/>
					<TextField
						type="password"
						className="textfield"
						name="pwconfirm"
						label="Pwconfirm"
						variant="outlined"
						onChange={(rp) => setRepeatPassword(rp.target.value)}
						value={repeatPassword}
					/>
					<br />
					<Button onClick={submit} variant="contained">
						Enviar
					</Button>
					{error ? <Alert severity="error">{error}</Alert> : null}
				</form>
				<p>
					¿Ya tienes una cuenta? <br />
					<a href="/Login">Inicia sesión</a>
				</p>

				<Link to="/InfoPods">
					<Button
						variant="contained"
						sx={{ color: "#fff", m: 1, backgroundColor: "#3e6969" }}
						endIcon={<InfoOutlinedIcon />}
					>
						Pods
					</Button>
				</Link>
				<p>
					¿No tienes un POD? Crea uno{" "}
					<a href="https://signup.pod.inrupt.com/">aquí</a>
				</p>
			</div>
		</div>
	);
};

export default Signup;
