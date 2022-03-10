import React, { useState, useEffect } from "react";
import { getUsers } from "./api/api";
import { User } from "./shared/shareddtypes";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Tienda from "./pages/Tienda";
import Historia from "./pages/Historia";
import Login from "./pages/Login";
import { getPinchos } from "./api/api";
import { Pincho } from "./shared/shareddtypes";
import "./App.css";
import { SessionProvider } from "@inrupt/solid-ui-react";
import { useSession, LogoutButton } from "@inrupt/solid-ui-react";

function App(): JSX.Element {
	const [users, setUsers] = useState<User[]>([]);
	const { session, sessionRequestInProgress } = useSession();
	const refreshUserList = async () => {
		setUsers(await getUsers());
	};

	useEffect(() => {
		refreshUserList();
	}, []);

	var app = (
		<SessionProvider>
			<div className="App">
				<NavBar />
				<Router>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/Tienda" element={<Tienda />} />
						<Route path="/Historia" element={<Historia />} />
						<Route path="/Login" element={<Login />} />
					</Routes>
				</Router>
				<Footer />
			</div>
		</SessionProvider>
	);

	return app;
}

export default App;
