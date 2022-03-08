import React from 'react';
import image from '../images/food.png';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

const Home = () => {
    return (
        <div id='home'>
        <main>
            <h1>Nos acercamos a lo natural.</h1>
            <p>DeDe es una tienda descentralizada cuyo propósito principal es llevar a tu casa la comida que quieras.</p>
            <Button variant="contained" sx={{bgcolor: '#596886'}}><Link href={"/Tienda"} sx={{ my: 2, color: '#fff', display: 'block'}}>Ver productos</Link></Button>
        </main>
        <aside>
            <img src={image}></img>
        </aside>
        </div>
        
    );
}

export default Home;