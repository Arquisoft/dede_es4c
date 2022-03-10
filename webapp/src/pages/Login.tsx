import React from "react";
import "./styles/login.css";
import foto from "../images/user.png";
import { LoginButton } from "@inrupt/solid-ui-react";
import { LinkButton } from "@inrupt/prism-react-components";
import { useState, useEffect } from "react";

const Login = () => {
	const idp = "https://broker.pod.inrupt.com";
	const redirUrl = "http://localhost:3000/tienda";
	return (
		<div>
			<div id="formLogin">
				<img src={foto}></img>
				<LoginButton
					authOptions={{ clientName: "dede_es4c" }}
					oidcIssuer={idp}
					redirectUrl={redirUrl}
				>
					<LinkButton variant="small">Log In</LinkButton>
				</LoginButton>
			</div>
		</div>
	);
};

export default Login;
