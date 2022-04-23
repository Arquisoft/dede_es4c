import React from 'react';
import { render, fireEvent, act } from "@testing-library/react";
import Footer from '../components/Footer';

test('check that the footer is rendering propertly', async() => {
    const { getByText } = render(<Footer/>);
    expect(getByText("ASW Lab4© 💙")).toBeInTheDocument();

});