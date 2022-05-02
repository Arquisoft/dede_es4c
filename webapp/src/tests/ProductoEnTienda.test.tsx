import { render, fireEvent } from "@testing-library/react";
import React from "react";
import Product from '../pages/Product';

test('check with any product', async () => {
    const { getByText} = render(<Product/>);
    expect(getByText('Precio: €')).toBeInTheDocument();
    expect(getByText('Añadir al carrito')).toBeInTheDocument();
})

test('check with a product', async () => {
    const { getByText } = render(<Product nombre = "Lomo" precio = {3}/>);
    expect(getByText('Lomo')).toBeInTheDocument(); 
    expect(getByText('Precio: 3 €')).toBeInTheDocument();
    expect(getByText('Añadir al carrito')).toBeInTheDocument();
})