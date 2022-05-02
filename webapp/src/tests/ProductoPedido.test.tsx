import { render, fireEvent } from "@testing-library/react";
import React from "react";
import ProductoPedido from '../components/ProductoPedido';
import { Producto } from "../interface/interfaces";

test('check with any product', async () => {
    const { getByText} = render(<ProductoPedido/>);
    expect(getByText('Sin producto')).toBeInTheDocument();
    expect(getByText('No hay precio')).toBeInTheDocument();
})

test('check with a product', async () => {
    var initialState: Producto = {id:"pollo", nombre:"pollo", precio:1.5, cantidad:2};
    const { getByText } = render(<ProductoPedido producto = {initialState}/>);
    expect(getByText('pollo(2 uds.)')).toBeInTheDocument();
    expect(getByText('Total: 3.00€')).toBeInTheDocument();
})