import { render, fireEvent } from "@testing-library/react";
import React from "react";
import MiembroAvatar from '../components/MiembroAvatar';
import { Miembro } from "../interface/interfaces";

test('check with no member', async () => {

    const { getByText} = render(<MiembroAvatar/>);
    expect(getByText('Sin nombre')).toBeInTheDocument();
    expect(getByText('UOxxxxxx')).toBeInTheDocument();
})

test('check with a member', async () => {
    const miembros = [ {_name:"Maria García Iglesias", imagen: new Object(), _uo:"UO854256"}];
    const { getByText } = render(<MiembroAvatar miembro = {miembros[0]}/>);
    expect(getByText('Maria García Iglesias')).toBeInTheDocument();
    expect(getByText('UO854256')).toBeInTheDocument();
})