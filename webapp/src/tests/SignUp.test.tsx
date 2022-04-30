import { render, fireEvent, getByLabelText, screen } from "@testing-library/react";
import React from "react";
import Signup from "../pages/Signup";
import { BrowserRouter as Router} from "react-router-dom";

test('check that we dont have any product in the cart', async () => {
    const { getByText, queryByText } = render(<Router><Signup/></Router>);
    expect(getByText('Sign Up')).toBeInTheDocument();
    expect(getByText('Enviar')).toBeInTheDocument();
    expect(getByText('¿Ya tienes una cuenta?')).toBeInTheDocument();
    expect(getByText('Inicia sesión')).toBeInTheDocument();
    expect(getByText('Pods')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeVisible();
    expect(screen.getByLabelText('User name')).toBeVisible();
    expect(screen.getByLabelText('Email')).toBeVisible();
    expect(screen.getByLabelText('Pwconfirm')).toBeVisible();
    expect(getByText('¿No tienes un POD? Crea uno')).toBeInTheDocument();
    fireEvent.click(getByText("Enviar"));
    expect(queryByText('Rellene los datos solicitados correctamente')).toBeInTheDocument();
    fireEvent.click(getByText("Pods"));
})