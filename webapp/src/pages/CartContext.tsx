import React from 'react';
import Producto from './Producto';

const listaPorDefecto: Producto[] = [];
  
  export const CarritoContext = React.createContext(
    listaPorDefecto
  );

export function addToCart(producto: Producto){
    listaPorDefecto.push(producto);
}
