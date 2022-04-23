import { render, fireEvent } from "@testing-library/react";
import React from "react";
import Home from '../pages/Home';

test('check that the Homeq page is rendered correctly', async () => {
    const {getByText} = render(<Home/>);
    expect(getByText('Nos acercamos a lo natural.')).toBeInTheDocument();
    expect(getByText("DeDe es una tienda descentralizada cuyo propósito principal es llevar a tu casa la comida que quieras.")).toBeInTheDocument();
});