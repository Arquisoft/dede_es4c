import { render, fireEvent } from "@testing-library/react";
import React from "react";
import ProductoLista from '../pages/ProductoLista';
import Producto from "../pages/Producto";
import { CartProvider } from "../context/cartProvider";

test('check that it renders the product correctly', async () => {
    var ingredientes: String[] = [];
    ingredientes[0] = "Huevo";
    ingredientes[1] = "Patata";
    ingredientes[2] = "Cebolla";
    var prod = new Producto("Tortilla", "Tortilla", 3.0, 0, "Pincho de tortilla", false, ingredientes);
    const { getByText, queryByText } = render(<CartProvider><ProductoLista product = {prod}/></CartProvider>);
    expect(getByText('Tortilla')).toBeInTheDocument();
    expect(getByText('Precio: 3 €')).toBeInTheDocument();
    expect(getByText('Añadir al carrito')).toBeInTheDocument();
    expect(getByText('Detalles producto')).toBeInTheDocument();
    fireEvent.click(getByText("Añadir al carrito"));
    expect(queryByText('Añadir al carrito')).not.toBeInTheDocument();
    expect(queryByText('Añadir más')).toBeInTheDocument();
    fireEvent.click(getByText("Añadir más"));
    fireEvent.click(getByText("Detalles producto"));
    expect(queryByText('Descripción:')).toBeInTheDocument();
    expect(queryByText('Pincho de tortilla')).toBeInTheDocument();
    expect(queryByText('Ingredientes:')).toBeInTheDocument();
    expect(queryByText('- Huevo')).toBeInTheDocument();
    expect(queryByText('- Patata')).toBeInTheDocument();
    expect(queryByText('- Cebolla')).toBeInTheDocument();
})

test('check render without a product', async () => {
    var ingredientes: String[] = [];
    var prod = new Producto("", "", 0, 0, "", false, ingredientes);
    const { getByText, queryByText } = render(<CartProvider><ProductoLista product = {prod}/></CartProvider>);
    expect(getByText('Precio: 0 €')).toBeInTheDocument();
    expect(getByText('Añadir al carrito')).toBeInTheDocument();
    expect(getByText('Detalles producto')).toBeInTheDocument();
    fireEvent.click(getByText("Añadir al carrito"));
    expect(queryByText('Añadir al carrito')).not.toBeInTheDocument();
    expect(queryByText('Añadir más')).toBeInTheDocument();
    fireEvent.click(getByText("Añadir más"));
    fireEvent.click(getByText("Detalles producto"));
    expect(queryByText('Descripción:')).toBeInTheDocument();
    expect(queryByText('Ingredientes:')).toBeInTheDocument();
})