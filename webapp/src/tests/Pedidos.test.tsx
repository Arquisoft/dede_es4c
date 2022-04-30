import { render, fireEvent } from "@testing-library/react";
import React from "react";
import ObjetoPedido from '../components/ObjetoPedido';
import { UserProvider } from "../context/userProvider";
import { Producto } from "../interface/interfaces";
import Pedidos from "../pages/Pedidos";


test('check that the page is rendering with one order', async () => {
    const { getByText } = render(<UserProvider><Pedidos/></UserProvider>);
    expect(getByText('Todavía no has realizado ningún pedido')).toBeInTheDocument();
})