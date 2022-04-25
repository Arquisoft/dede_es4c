import { render, fireEvent } from "@testing-library/react";
import React from "react";
import Tienda from '../pages/Tienda';

test('check that we are in the shop view', async () => {
    const {getByText} = render(<Tienda/>);
    expect(getByText('Artículos disponibles')).toBeInTheDocument();
    
})

test('check filters works fine', async () => {
    // const { container, getByText, queryByText } = await render(<Tienda/>);
    // const buttonFilter = container.querySelector('.filterButton')!;
    // expect(getByText('Artículos disponibles')).toBeInTheDocument();
    // expect(container).toHaveTextContent('Tortilla');
    // expect(queryByText('Jamon')).toBeInTheDocument();
    // expect(queryByText('Lomo con queso')).toBeInTheDocument();
    // fireEvent.click(buttonFilter, {});
    // expect(getByText('Comida')).toBeInTheDocument();
    // expect(getByText('Bebida')).toBeInTheDocument();
    // expect(getByText('Postres')).toBeInTheDocument();
    // expect(getByText('Vegetarianos')).toBeInTheDocument();
    // expect(getByText('No Vegetarianos')).toBeInTheDocument();
    // fireEvent.click(getByText("Comida")); 
    // expect(queryByText('Tortilla')).toBeInTheDocument();
    // expect(queryByText('Jamon')).toBeInTheDocument();
    // expect(queryByText('Lomo con queso')).toBeInTheDocument();
    // expect(queryByText('Bacon con queso')).toBeInTheDocument();
    // expect(queryByText('Agua')).not.toBeInTheDocument();
})