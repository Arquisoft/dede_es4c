import React, { useContext, useEffect } from "react";
import image from '../images/food.png';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { handleIncomingRedirect } from '@inrupt/solid-client-authn-browser';
import { InfoPod } from "../interface/interfaces";
import { UserContext } from "../context/userContext";

const Home = () => {
    const { setInfo } = useContext(UserContext);

        

    return (
        <div id='home'>
        <main>
            <h1>Nos acercamos a lo natural.</h1>
            <p>DeDe es una tienda descentralizada cuyo propósito principal es llevar a tu casa la comida que quieras.</p>
            <Link href={"/Tienda"} sx={{ my: 2, color: '#fff', display: 'block'}} underline='none'><Button variant="contained" sx={{bgcolor: '#596886'}}>Ver productos</Button></Link>
        </main>
        <aside>
            <img src={image}></img>
        </aside>
        </div>
        
    );
}

export default Home;