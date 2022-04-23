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
import { UserData } from "../interface/interfaces";

  
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

    const dataset = await getSolidDataset(webId, {
        fetch: session.fetch,
    })

    const profile = getThing(dataset, webId);

     const username = getStringNoLocale(profile!, FOAF.name)

    const file = await getFile(
        "https://pod.inrupt.com/" + username + "/dede/Datos.json",
        { fetch: fetch},
    );
    const json = JSON.parse(await file.text());
    return json;
}

export async function setUserInfo(userData: UserData, session: { fetch: any; }, webId: string | Url){
    const dataset = await getSolidDataset(webId, {
        fetch: session.fetch,
    })
    const profile = getThing(dataset, webId);
    const username = getStringNoLocale(profile!, FOAF.name)
    let file = new Blob([JSON.stringify(userData)], {type: 'text/json'});
    
    try{
    const savedFile = await overwriteFile(
        "https://pod.inrupt.com/" + username + "/dede/Datos.json", // URL for the file.
        file, // File
        { contentType: file.type, fetch: fetch }, // mimetype if known, fetch from the authenticated session
    );
    console.log("Se ha subido el archivo " + savedFile + " correctamente");
    }catch (error){
        console.log("Se ha producido un error al subir el archivo al pod");
    }
}