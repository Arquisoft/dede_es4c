import React, { useContext } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tienda from "./pages/Tienda";
import Historia from "./pages/Historia";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Pedido from "./pages/Pedidos";
import "./App.css";
import Perfil from "./pages/Perfil";
import InfoPods from "./pages/InfoPods";
import RealizaPedido from "./pages/RealizaPedido";
import { useSession } from "@inrupt/solid-ui-react";

import "./App.css";
import { UserContext } from "./context/userContext";

function App(): JSX.Element {
	const { stateUser, setInfo } = useContext(UserContext);

	const { session } = useSession();

	return (
		<div className="App">
			<Router>
				<NavBar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/Tienda" element={<Tienda />} />
					<Route path="/Signup" element={<Signup />} />
					<Route path="/Historia" element={<Historia />} />
					<Route path="/Login" element={<Login />} />
					<Route path="/Pedidos" element={<Pedido />} />
					<Route path="/Perfil" element={<Perfil />} />
					<Route path="/InfoPods" element={<InfoPods />} />
					<Route path="/RealizaPedido" element={<RealizaPedido />} />
				</Routes>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
