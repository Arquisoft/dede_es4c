import {
    getStringNoLocale,
    getSolidDataset,
    getSourceUrl,
    getThing,
    getThingAll,
    getUrlAll,
    Url,
} from "@inrupt/solid-client";

import {
    useSession,
    CombinedDataProvider,
    Image,
    Text,
  } from "@inrupt/solid-ui-react";

  
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
    const UrlsPods = getUrlAll(profile!, STORAGE_PREDICATE);

    const userPod = UrlsPods[0];

    //Cogemos el contenedor, carpeta donde se guardan los datos
    const container = `${userPod}public/data/`; 

    const prueba = `${container}Prueba.txt`;
    const fichero = await getSolidDataset(prueba, {fetch: session.fetch,})
    console.log(fichero);
}