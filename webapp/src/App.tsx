import React, { useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate,
	Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Tienda from "./pages/Tienda";
import Historia from "./pages/Historia";
import Login from "./pages/Login";

import Tracer from "./components/Tracer";

import "./App.css";
import { SessionContext, useSession } from "@inrupt/solid-ui-react";
import {
	handleIncomingRedirect,
	onSessionRestore,
} from "@inrupt/solid-client-authn-browser";
import { ReplayCircleFilled, WindowSharp } from "@mui/icons-material";

function App(): JSX.Element {
	const { session } = useSession();
	const navigate = useNavigate();

	useEffect(() => {
		// 2. When loading the component, call `handleIncomingRedirect` to authenticate
		//    the user if appropriate, or to restore a previous session.
		handleIncomingRedirect({
			restorePreviousSession: true,
		}).then((info) => {
			console.log("iniciado sesion as " + info?.webId);
		});
	}, []);

	session.onSessionRestore((url) => {
		navigate(url, { replace: true });
	});

	var app = (
		<div className="App">
			<div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/Tienda" element={<Tienda />} />
					<Route path="/Historia" element={<Historia />} />
					<Route path="/Login" element={<Login />} />
				</Routes>
			</div>
			<div className="infosession">
				{session.info.isLoggedIn ? (
					<h1>Logged in as {session.info.webId}</h1>
				) : (
					<h1>Not Logged in</h1>
				)}
			</div>
			<Tracer/>
		</div>
	);

	return app;
}

export default App;
