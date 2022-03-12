
import { CartState, Producto } from "../interface/interfaces";

type CartAction =
    | {type: 'addToCart', payload: Producto}
    | {type: 'removeToCart', payload: {id: string}}
    | {type: 'increase', payload: Producto}


export const cartReducer = (state:CartState, action:CartAction): CartState => {
    switch (action.type){
        case 'addToCart':
            if(!state.productos.find(item => item.id === action.payload.id)){
                state.total += action.payload.precio;
                state.numeroElems += 1;
                localStorage.setItem('cart', JSON.stringify(state));
            }
            return {
                ...state,
                productos: [ ...state.productos, action.payload ]
            }
        case 'removeToCart':
            state.productos = state.productos.filter(
                (item) => item.id !== action.payload.id
            );
            let initial = 0;
            state.total = state.productos.reduce(
                (previos, current) => previos + (current.precio * current.cantidad), initial
            );
            localStorage.setItem('cart', JSON.stringify(state));
            return {
                ...state
            }
        case 'increase':
            state.productos[state.productos.findIndex(item => item.id === action.payload.id)].cantidad++;
            let initial2 = 0;
            state.total = state.productos.reduce(
                (previos, current) => previos + (current.precio * current.cantidad), initial2
            );
            return {
                ...state
            }
        default:
            return state;
    }
}