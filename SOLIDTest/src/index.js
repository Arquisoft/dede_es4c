import {
	getFile,
	isRawData,
	getContentType,
	getSourceUrl,
	overwriteFile,
	getcon,
} from "@inrupt/solid-client";

import {
	login,
	handleIncomingRedirect,
	getDefaultSession,
	fetch,
} from "@inrupt/solid-client-authn-browser";

import { SCHEMA_INRUPT, RDF, AS } from "@inrupt/vocab-common-rdf";

const podUrl = "https://pod.inrupt.com/uo277306";
const buttonLogin = document.querySelector("#btnLogin");
const readButton = document.querySelector("#readButton");
const writeButton = document.querySelector("#writeButton");
const receivedData = document.querySelector("#receivedData");

readButton.disabled = true;
writeButton.disabled = true;

const session = getDefaultSession();

// Inicia el proceso de login al pulsar el boton de login
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
	if (session.info.isLoggedIn) {
		// Update the page with the status.
		document.getElementById(
			"labelStatus",
		).textContent = `Logged in with WebID ${session.info.webId}`;
		document.getElementById("labelStatus").setAttribute("role", "alert");
		// Enable Create button
		readButton.disabled = false;
		writeButton.disabled = false;
	}
}

// The example has the login redirect back to the index.html.
// finishLogin() calls the function to process login information.
// If the function is called when not part of the login redirect, the function is a no-op.
finishLogin();

// En SOLID se puede leer y escribir datos estructurados en SolidDataset's y/o leer y escribir ficheros como jpg, json, txt...
// En este ejemplo usaremos ficheros txt por sencillez, ya que los datasets de solid aunque sean en teoría mas seguros,
// son algo mas complejos de operar con. En el producto final puede que sea mas comodo usar json para sincronizar con nuestra BBDD

//Al darle al boton de leer llamamos a esta funcion que en el caso de que tengamos la sesion iniciada inicia la lectura del fichero en la url
async function startReading() {
	if (session.info.isLoggedIn) {
		readFileFromPod(`${podUrl}/dede_es04/read_test.txt`);
	}
}

// Lee un archivo del POD y lo convierte en un Blob (Binary large object, basicamente un monton de bytes, hay librerias de js para
// procesarlos como ficheros de cualquier tipo, imagen, texto... Tambien se pueden descargar y guardar estos. En este ejemplo solo lo leeremos)
async function readFileFromPod(fileURL) {
	try {
		// file is a Blob (see https://developer.mozilla.org/docs/Web/API/Blob)
		// Sacamos el archivo de la url
		const file = await getFile(
			fileURL, // File in Pod to Read
			{ fetch: fetch }, // fetch from authenticated session
		);
		// Imprimimos el tipo, hay muchas mas funciones, info aqui en el final del apartado de Retrive a File
		// https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/read-write-files/
		console.log(
			`Fetched a ${getContentType(file)} file from ${getSourceUrl(file)}.`,
		);
		console.log(`The file is ${isRawData(file) ? "not " : ""}a dataset.`);

		// Asignamos el texto del fichero a nuestro objeto para mostrarlo en el HTML, como sabemos que es texto no hay problema, si no supieramos que
		// tipo de fichero es habria que comprobarlo y trabajar en acorde
		receivedData.value = await file.text();
	} catch (err) {
		console.log(err);
	}
}

// Al darle al boton de escribir llamamos a esta funcion que en el caso de que tengamos la sesion iniciada inicia la escritura del texto
// en nuestro input a el fichero en la url. Se podría hacer que tengamos que inputear los archivos y subirlos al POD con la file API de js
async function startWritting() {
	if (session.info.isLoggedIn) {
		let file = createFileFromText("Texto que contenerá el fichero de pruebas de escritura por Damir Abdrafikov UO277306");
		writeFileToPod(file, `${podUrl}/dede_es04/write_test.txt`, fetch);
	}
}

// Upload File to the targetFileURL.
// If the targetFileURL exists, overwrite the file.
// If the targetFileURL does not exist, create the file at the location.
async function writeFileToPod(file, targetFileURL, fetch) {
	try {
		const savedFile = await overwriteFile(
			targetFileURL, // URL for the file.
			file, // File
			{ contentType: file.type, fetch: fetch }, // mimetype if known, fetch from the authenticated session
		);
		console.log(`File saved at ${getSourceUrl(savedFile)}`);
	} catch (error) {
		console.error(error);
	}
}

buttonLogin.onclick = function () {
	startLogin();
};

readButton.onclick = function () {
	startReading();
};

writeButton.onclick = function () {
	startWritting();
};
