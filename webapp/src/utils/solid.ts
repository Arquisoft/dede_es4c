import {
    getStringNoLocale,
    getSolidDataset,
    getThing,
    overwriteFile,
    Url,
    getFile,
} from "@inrupt/solid-client";

import {
	fetch,
} from "@inrupt/solid-client-authn-browser";

  
import { FOAF } from "@inrupt/lit-generated-vocab-common";

const STORAGE_PREDICATE = "http://www.w3.org/ns/pim/space#storage";

export async function getUsername(session: { fetch: any; }, webId: string | Url) {
    
    const dataset = await getSolidDataset(webId, {
        fetch: session.fetch,
    })

    const profile = getThing(dataset, webId);

     return getStringNoLocale(profile!, FOAF.name)
   
}

export async function getUserInfo(session: { fetch: any; }, webId: string | Url){
    console.log("pasando")
    try{
    const dataset = await getSolidDataset(webId)

    const profile = getThing(dataset, webId);

     const username = getStringNoLocale(profile!, FOAF.name)
    
    const file = await getFile(
        "https://pod.inrupt.com/" + username + "/dede/Datos.json",
        { fetch: fetch},
    );
    const json = JSON.parse(await file.text());
    return json;
    }catch (error){
        console.log("Se ha producido un error al recuperar los datos")
        console.log(error)
        return {email: "", address: "", phone: ""}
    }
}

export async function setUserInfo(userData: any, session: { fetch: any; }, webId: string | Url){
    console.log(userData);
    const dataset = await getSolidDataset(webId, {
        fetch: session.fetch,
    })
    const profile = getThing(dataset, webId);
    const username = getStringNoLocale(profile!, FOAF.name.iri.value)
    let file = new Blob([JSON.stringify(userData)], {type: 'text/json'});
    try{
    const savedFile = await overwriteFile(
        "https://pod.inrupt.com/" + username + "/dede/Datos.json", // URL for the file.
        file, // File
        { contentType: file.type, fetch: fetch }, // mimetype if known, fetch from the authenticated session
    );
    console.log("Se ha subido el archivo " + userData + " correctamente");
    }catch (error){
        console.log("Se ha producido un error al subir el archivo al pod");
    }
}