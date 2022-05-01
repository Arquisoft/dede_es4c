import { render, fireEvent, screen } from "@testing-library/react";
import React from "react";
import NavBar from '../components/NavBar';
import { CartProvider } from "../context/cartProvider";
import { BrowserRouter as Router} from "react-router-dom";

test('check that the Shop page is rendered correctly', async () => {
    const { container, getByText, queryByText } = render(<CartProvider><Router><NavBar/></Router></CartProvider>);
    var buttonUser = container.querySelector('.userOptions')!;
    fireEvent.click(buttonUser, {});
    expect(queryByText("Login")).toBeInTheDocument();
});

test('click in cart button', async () => {
    const { container, queryByText } = render(<CartProvider><Router><NavBar/></Router></CartProvider>);
    var buttonCart = container.querySelector('.buttonCart')!;
    fireEvent.click(buttonCart, {});
    expect(queryByText('Carrito')).toBeInTheDocument();
    expect(queryByText("La cesta está vacía")).toBeInTheDocument();
    expect(queryByText("Total del importe: 0.00 €")).toBeInTheDocument();
});
