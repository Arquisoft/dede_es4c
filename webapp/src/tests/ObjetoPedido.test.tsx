import { render, fireEvent } from "@testing-library/react";
import React from "react";
import ObjetoPedido from '../components/ObjetoPedido';
import { Producto } from "../interface/interfaces";

test('check with any product', async () => {
    const { getByText} = render(<ObjetoPedido numero = {1}/>);
    expect(getByText('Pedido número 1 (0€)')).toBeInTheDocument();
})

test('check with two products', async () => {
    const initialState: Producto[] = [
        {
            id: 'arroz con leche',
            nombre: 'arroz con leche',
            precio: 2.25,
            cantidad: 3
        }, {
            id: 'agua',
            nombre: 'agua',
            precio: 1,
            cantidad: 5
        }
    ]
    const { getByText } = render(<ObjetoPedido numero = {5} productos = {initialState}/>);
    expect(getByText('Pedido número 5 (11.75€)')).toBeInTheDocument();
    expect(getByText('arroz con leche - cant: 3, agua - cant: 5,')).toBeInTheDocument();
})