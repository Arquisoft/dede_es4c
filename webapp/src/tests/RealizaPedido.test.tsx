import { render, fireEvent } from "@testing-library/react";
import React from "react";
import RealizaPedido from '../pages/RealizaPedido';
import { Producto } from "../interface/interfaces";
import { CartProvider } from "../context/cartProvider";
import CartDrawer from '../components/CartDrawer';

test('check that we dont have any product in the cart', async () => {
    const { getByText, queryByText } = render(<CartProvider><RealizaPedido/></CartProvider>);
    expect(getByText('Pedido Final')).toBeInTheDocument();
    expect(getByText('Total a pagar: 0€')).toBeInTheDocument();
    expect(getByText('Realizar compra')).toBeInTheDocument();
    fireEvent.click(getByText("Realizar compra"));
    expect(queryByText('La cesta está vacía, añade los productos y vuelve para finalizar')).toBeInTheDocument();
})

test('check with 2 products inn the cart', async () => {
    const initialState: Producto[] = [
        {
            id: 'pollo',
            nombre: 'pollo',
            precio: 1.5,
            cantidad: 1
        }, {
            id: 'tortilla',
            nombre: 'tortilla',
            precio: 2,
            cantidad: 1
        }
    ]
    render(<CartProvider><CartDrawer products={initialState} /></CartProvider>);
    //No se comprueba si se ven los productos ya que eso se realiza en otro test (ProductoPedido.test.tsx)
    const { container, getByText, queryByText } = render(<CartProvider><RealizaPedido/></CartProvider>);
    expect(getByText('Pedido Final')).toBeInTheDocument();
    expect(getByText('Realizar compra')).toBeInTheDocument();
    expect(getByText('Total a pagar: 3.5€')).toBeInTheDocument();
    fireEvent.click(getByText("Realizar compra"));
    expect(queryByText('Debes iniciar sesión para realizar el pedido')).toBeInTheDocument();
    const buttonCart = container.querySelector('.cerrar')!;
    fireEvent.click(buttonCart, {});
})