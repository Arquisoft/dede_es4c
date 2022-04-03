import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CartProvider } from "./context/cartProvider";
import { UserProvider} from "./context/userProvider";
import { SessionProvider } from "@inrupt/solid-ui-react";

ReactDOM.render(
	<SessionProvider>
	<UserProvider>
	<CartProvider>
		<App />
	</CartProvider>
	</UserProvider>
	</SessionProvider>,
	document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
