import { render, fireEvent } from "@testing-library/react";
import React from "react";
import NavBar from '../components/NavBar';
import { CartProvider } from "../context/cartProvider";
import { BrowserRouter as Router} from "react-router-dom";

test('check that the Shop page is rendered correctly', async () => {
    const { container, getByText, queryByText } = render(<CartProvider><Router><NavBar/></Router></CartProvider>);
    var buttonUser = container.querySelector('.userOptions')!;
    fireEvent.click(buttonUser, {});
    expect(queryByText('Signup')).toBeInTheDocument();
    expect(queryByText("Login")).toBeInTheDocument();
    expect(queryByText("Pedidos")).toBeInTheDocument();
});