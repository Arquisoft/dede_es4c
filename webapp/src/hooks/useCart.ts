import { useContext } from "react";
import { CartContext } from "../context/cartContext"

export const useCart = () => {
    const {cartState, addToCart} = useContext(CartContext);
    const {productos} = cartState;

    return{
        productos: productos,
        addToCart
    }
}