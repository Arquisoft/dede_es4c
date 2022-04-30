import { render, fireEvent, getByLabelText, screen } from "@testing-library/react";
import React from "react";
import Login from "../pages/Login";
import { BrowserRouter as Router} from "react-router-dom";

test('check that we dont have any product in the cart', async () => {
    const { getByText, queryByText } = render(<Router><Login/></Router>);
    expect(getByText('Login')).toBeInTheDocument();
    expect(getByText('Enviar')).toBeInTheDocument();
    expect(getByText('¿No tienes uno todavía?')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeVisible();
    expect(screen.getByLabelText('Email')).toBeVisible();
    fireEvent.click(getByText("Enviar"));
    expect(queryByText('Rellene los datos solicitados correctamente')).toBeInTheDocument();
})