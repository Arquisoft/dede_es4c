import {
    getStringNoLocale,
    getSolidDataset,
    getSourceUrl,
    getThing,
    getThingAll,
    getUrlAll,
    Url,
    getFile,
} from "@inrupt/solid-client";

import {
	login,
	handleIncomingRedirect,
	getDefaultSession,
	fetch,
} from "@inrupt/solid-client-authn-browser";

  
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";

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