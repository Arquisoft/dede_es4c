import React, { useEffect } from 'react';
import {useReducer} from 'react';
import { CartState, Producto } from '../interface/interfaces';
import { CartContext } from "./cartContext";
import { cartReducer } from './cartReducer';

const INITIAL_STATE: CartState ={
    numeroElems: 0,
    total: 0,
    productos: []
}

interface CartProviderProps{
    children: JSX.Element | JSX.Element[];
}


export const CartProvider = ({children}: CartProviderProps) => {

    const [cartState, dispatch] = useReducer(cartReducer, INITIAL_STATE, () => {
        const localData = localStorage.getItem('cart')
        return localData ? JSON.parse(localData) : INITIAL_STATE
    });

    const addToCart = (producto: Producto) => {
        dispatch({type: 'addToCart', payload: {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        } })
    }

    const removeToCart = (id: string) => {
        dispatch({type: 'removeToCart', payload: {id}})
    }

    const increase = (producto: Producto) => {
        dispatch({type: 'increase', payload: producto})
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartState))
    }, [cartState]);

    return(
        <CartContext.Provider value={{cartState,addToCart, removeToCart, increase }}>
            {children}
        </CartContext.Provider>
    );
}