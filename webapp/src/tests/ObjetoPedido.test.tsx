import { render, fireEvent } from "@testing-library/react";
import React from "react";
import ObjetoPedido from '../components/ObjetoPedido';
import { Producto } from "../interface/interfaces";


test('check with two products', async () => {
    const pedido = {
        _id: "1",
        _precio: "4",
        _direccion: {
            country: "España",
            city: "Oviedo",
            zip: "33005",
            street1: "Avda. Galicia"
        },
        _productos: {
            "arroz con leche" : "3",
            "agua" : "1"
        },
        _fecha: "29/04/2022"
    };
    const { getByText } = render(<ObjetoPedido numero = {5} pedido = {pedido}/>);
    expect(getByText('arroz con leche 3 uds.agua 1 uds.')).toBeInTheDocument();
    expect(getByText('País: España')).toBeInTheDocument();
    expect(getByText('Ciudad: Oviedo')).toBeInTheDocument();
    expect(getByText('Calle: Avda. Galicia')).toBeInTheDocument();
})