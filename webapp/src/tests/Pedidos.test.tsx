import { render } from "@testing-library/react";
import React from "react";
import { UserProvider } from "../context/userProvider";
import Pedidos from "../pages/Pedidos";


test('check that the page is rendering with no orders', async () => {
    const { getByText } = render(<UserProvider><Pedidos/></UserProvider>); 
    expect(getByText('Todavía no has realizado ningún pedido')).toBeInTheDocument();
})