import { render, fireEvent } from "@testing-library/react";
import React from "react";
import Historia from '../pages/Historia';

test('check that the History page is rendered correctly', async () => {
    const {getByText} = render(<Historia/>);
    expect(getByText('Sobre nosotros.')).toBeInTheDocument();
    expect(getByText("Desarrolladores de la tienda:")).toBeInTheDocument();
    expect(getByText("Dede es una tienda de comida desarrollada con REACT y Nodejs que hace uso de SOLID para asegurar al usuario la privacidad y la seguridad de sus datos.")).toBeInTheDocument();
});