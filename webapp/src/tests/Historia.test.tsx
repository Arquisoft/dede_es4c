import { render, fireEvent } from "@testing-library/react";
import React from "react";
import Historia from '../pages/Historia';

test('check that the Shop page is rendered correctly', async () => {
    const {getByText} = render(<Historia/>);
    expect(getByText('Sobre nosotros.')).toBeInTheDocument();
    expect(getByText("Desarrolladores de la tienda:")).toBeInTheDocument();
    expect(getByText("Daniel Ferreira Gómez")).toBeInTheDocument();
    expect(getByText("Hugo Gutiérrez Tomás")).toBeInTheDocument();
    expect(getByText("Sergio Castillo")).toBeInTheDocument();
    expect(getByText("Damir Abdrafikov")).toBeInTheDocument();
});