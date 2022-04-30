import { render, fireEvent } from "@testing-library/react";
import React from "react";
import { UserProvider } from "../context/userProvider";
import Pedidos from '../pages/Pedidos';

test('check with any product', async () => {
    const { getByText} = render(<UserProvider><Pedidos/></UserProvider>);
    expect(getByText('Todavía no has realizado ningún pedido')).toBeInTheDocument();
})