import { render, fireEvent } from "@testing-library/react";
import React from "react";
import InfoPods from '../pages/InfoPods';

test('check page loading', async () => {
    const { getByText, queryByText} = render(<InfoPods/>);
    expect(getByText('Información sobre los PODS:')).toBeInTheDocument();
    expect(getByText('Con SOLID tus datos estarán seguros gracias a contenedores descentralizados, los PODS. Para poder realizar compras en nuestra página web, simplemente tendrás que estar registrado en el proveedor de PODS que nos da servicio. Una vez registrado, inicia sesión con esa cuenta en nuestra aplicación.')).toBeInTheDocument();
    expect(getByText('¿Qué datos almacenamos sobre usted?')).toBeInTheDocument();
    expect(getByText('Bueno esta pregunta seguro que es la que más interesa responder a nuestros clientes. Intentamos guardar la mínima información posible, pero cosas como la dirección, el nombre del usuario... es imprescindible de guardar. De todas formas, vamos a guardar la mínima información y, obviamente, con las mayores medidas de seguridad posibles.')).toBeInTheDocument();
    fireEvent.click(getByText("Volver a registro"));
})