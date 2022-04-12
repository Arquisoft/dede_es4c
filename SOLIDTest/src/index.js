import {
	createSolidDataset,
	createThing,
	setThing,
	addUrl,
	addStringNoLocale,
	saveSolidDatasetAt,
	getSolidDataset,
	getThingAll,
	getStringNoLocale,
	removeThing,
	FetchError,
} from "@inrupt/solid-client";

import {
	login,
	handleIncomingRedirect,
	getDefaultSession,
	fetch,
} from "@inrupt/solid-client-authn-browser";

import { SCHEMA_INRUPT, RDF, AS } from "@inrupt/vocab-common-rdf";

const buttonLogin = document.querySelector("#btnLogin");
const buttonCreate = document.querySelector("#btnCreate");
buttonCreate.disabled = true;
const labelCreateStatus = document.querySelector("#labelCreateStatus");

// 1a. Start Login Process. Call login() function.
function startLogin() {
	return login({
		oidcIssuer: "https://broker.pod.inrupt.com",

		redirectUrl: window.location.href,
		clientName: "Getting started app",
	});
}

// 1b. Login Redirect.
// When redirected after login, call handleIncomingRedirect() function to
// finish the login process by retrieving session information.
async function finishLogin() {
	await handleIncomingRedirect();
	const session = getDefaultSession();
	if (session.info.isLoggedIn) {
		// Update the page with the status.
		document.getElementById(
			"labelStatus",
		).textContent = `Logged in with WebID ${session.info.webId}`;
		document.getElementById("labelStatus").setAttribute("role", "alert");
		// Enable Create button
		buttonCreate.disabled = false;
	}
}

// The example has the login redirect back to the index.html.
// finishLogin() calls the function to process login information.
// If the function is called when not part of the login redirect, the function is a no-op.
finishLogin();

// 2. Create the Reading List
async function createList() {
	labelCreateStatus.textContent = "";
	const podUrl = document.getElementById("PodURL").value;

	// For simplicity and brevity, this tutorial hardcodes the SolidDataset URL.
	// In practice, you should add a link to this resource in your profile that applications can follow.
	const whereToSaveNameUrl = `${podUrl}/dede_es04/user/name`;
	console.log("Esto es donde lo vamos a guardar " + whereToSaveNameUrl);

	let nombreQueVamosAGuardar = document.getElementById("nombreQueVamosAGuardar").value;
	console.log("Esto es lo que vamos a guardar " + nombreQueVamosAGuardar);
	// Fetch or create a new reading list.
	let myNameSet;

	//Intenta leer los textos
	try {
		// Attempt to fetch the reading list in case it already exists.
		myNameSet = await getSolidDataset(whereToSaveNameUrl, { fetch: fetch });

		// Vacia los textos (leemos luego)
		// Para todas las cosas en el dataset, quitalas
		let cosasQueHayEnElSet = getThingAll(myNameSet);

		cosasQueHayEnElSet.forEach((cosaDelSet) => {
			//remove del myNameSet la cosaDelSet
			console.log(
				"Esto es el item del set que vamos a borrar ahora " + cosaDelSet.url,
			);
			myNameSet = removeThing(myNameSet, cosaDelSet);
		});
	} catch (error) {
		if (typeof error.statusCode === "number" && error.statusCode === 404) {
			// if not found, create a new SolidDataset
			myNameSet = createSolidDataset();
			console.log("Creado dataset")
		} else {
			console.error(error.message);
		}
	}

	// Añadir los nombre al Dataset
	// Creamos el coso
	let esteNombre = createThing({ name: "nombre" });
	// Le añadimos la url de acesso con mas cosas
	esteNombre = addUrl(esteNombre, RDF.type, AS.Article);
	// Le añadimos nuestro texto
	esteNombre = addStringNoLocale(
		esteNombre,
		SCHEMA_INRUPT.name,
		nombreQueVamosAGuardar,
	);
	// Guardamos esteNombre en el set
	myNameSet = setThing(myNameSet, esteNombre);

		console.log("Thing que guardamos ", esteNombre.type, esteNombre.url)

	try {
		// Save the SolidDataset
		let savedReadingList = await saveSolidDatasetAt(
			whereToSaveNameUrl,
			myNameSet,
			{
				fetch: fetch,
			},
		);

		console.log("saved list ", savedReadingList);
		labelCreateStatus.textContent = "Saved";

		// Refetch the Reading List
		savedReadingList = await getSolidDataset(whereToSaveNameUrl, {
			fetch: fetch,
		});

		let cosasQueHayEnElSet = getThingAll(savedReadingList);

		let listcontent = "";
		cosasQueHayEnElSet.forEach((cosaDelSet) => {
			let item = getStringNoLocale(cosaDelSet, SCHEMA_INRUPT.name);
			if (item != null) {
				listcontent += item + "\t";
				console.log(item.text);
			}
		});

		document.getElementById("savednombre").value = listcontent;
	} catch (error) {
		console.log(error);
		labelCreateStatus.textContent = "Error" + error;
		labelCreateStatus.setAttribute("role", "alert");
	}
}

buttonLogin.onclick = function () {
	startLogin();
};

buttonCreate.onclick = function () {
	createList();
};
