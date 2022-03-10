import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./styles/login.css";
import foto from "../images/user.png";
import { LoginButton } from "@inrupt/solid-ui-react";

const Login = () => {
	return (
		<div>
			<div id="formLogin">
				<img src={foto}></img>
				<h1>Login</h1>
				<LoginButton
					oidcIssuer={"https://broker.pod.inrupt.com"}
					redirectUrl={"/tienda"}
				></LoginButton>
			</div>
		</div>
	);
};

export default Login;
