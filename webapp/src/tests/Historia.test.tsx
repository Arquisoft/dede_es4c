import { render, fireEvent } from "@testing-library/react";
import React from "react";
import Historia from '../pages/Historia';

test('check that the Shop page is rendered correctly', async () => {
    const {getByText} = render(<Historia/>);
    expect(getByText('Sobre nosotros.')).toBeInTheDocument();
    expect(getByText("Desarrolladores de la tienda:")).toBeInTheDocument();
});