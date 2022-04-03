import React from 'react';
import image from '../images/solid.png';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

const InfoPods = () => {
    return (
        <div id='home'>
        <main>
            <h1>Información sobre los PODS:</h1>
            <p>Con SOLID tus datos estarán seguros gracias a contenedores descentralizados, los PODS.
                Para poder realizar compras en nuestra página web, simplemente tendrás que estar registrado en el proveedor de PODS que nos da servicio.
                Una vez registrado, inicia sesión con esa cuenta en nuestra aplicación.
            </p>
            <h2>¿Qué datos almacenamos sobre usted?</h2>
            <p>Bueno esta pregunta seguro que es la que más interesa responder a nuestros clientes. Intentamos guardar la mínima información posible, pero
                cosas como la dirección, el nombre del usuario... es imprescindible de guardar. De todas formas, vamos a guardar la mínima información y,
                obviamente, con las mayores medidas de seguridad posibles.
            </p>
            <Link href={"/Signup"} sx={{ my: 2, color: '#fff', display: 'block'}} underline='none'><Button variant="contained" sx={{bgcolor: '#596886'}}>Volver a registro</Button></Link>
        </main>
        <aside>
            <img src={image}></img>
        </aside>
        </div>
        
    );
}

export default InfoPods;