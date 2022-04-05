import {createContext} from 'react';
import { CartState, Producto } from '../interface/interfaces';

export type CartContextProps = {
    cartState: CartState;
    addToCart: (producto: Producto) => void;
    removeToCart: (id: string) => void;
    increase: (producto: Producto) => void;
}

export const CartContext = createContext<CartContextProps>({} as CartContextProps);

