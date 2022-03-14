import React, { useState, useEffect, useContext } from 'react';
import Producto from '../pages/Producto';
import { getPinchos } from '../api/api';
import { getPinchoComida } from '../api/api';
import { getPinchoBebida } from '../api/api';
import { getPinchoById } from '../api/api';
import {Pincho} from '../shared/shareddtypes';


function CargaPinchos(tipo: string): Producto[]{
    const [pinchos, setPinchos] = useState<Pincho[]>([]);

    const refreshPinchosList = async () => {
        if(tipo === "comida")
            setPinchos(await getPinchoComida());
        else if(tipo === "bebida")
            setPinchos(await getPinchoBebida());
        else if(tipo === "todos")
            setPinchos(await getPinchos());
        else
            setPinchos(await getPinchoById(tipo));
      }
    
      useEffect(()=>{
        refreshPinchosList();
      },[]);

      var productosReales: Producto[] = [];

      pinchos.map((pincho: Pincho) =>(
         productosReales.push(new Producto(pincho._id, pincho._id, +pincho._precio, 1))
    ));

    return productosReales;
}

export default CargaPinchos;