import React, { useContext } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tienda from "./pages/Tienda";
import Historia from "./pages/Historia";
import Login from "./pages/Login";
import "./App.css";
import { SessionContext, useSession } from "@inrupt/solid-ui-react";

function App(): JSX.Element {
	const { session, sessionRequestInProgress } = useSession();

	// if (localStorage.getItem('session') != null){
	// 	session = JSON.parse(localStorage.getItem('session'));
	// }
	// localStorage.setItem("session", JSON.stringify(session));

	var app = (
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
			<div className="infosession">
				{session.info.isLoggedIn ? <h1>Logged in</h1> : <h1>Not Logged in</h1>}
				{sessionRequestInProgress ? (
					<h1>Request in</h1>
				) : (
					<h1>Not Request in</h1>
				)}
			</div>
			<Footer />
		</div>
	);

	return app;
}

export default App;
