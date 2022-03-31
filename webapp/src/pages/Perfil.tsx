import React, { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import { UserContext } from '../context/userContext';
import Button from '@mui/material/Button';

const Perfil = () => {

    const {stateUser} = useContext(UserContext);

    const prueba = () => {
        console.log(stateUser)
    }

    return (
        <div id='perfil'>
            <div id="mainPerfil">
                <h1>Perfil del usuario</h1>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus consectetur tempore recusandae ullam praesentium quae ducimus eum! Voluptas, quidem quae, distinctio maiores tempora architecto molestiae eaque et ducimus atque quisquam!</p>
            </div>
        <Button onClick={prueba}>Pulsa aqui</Button>
        </div>
        
    );
}

export default Perfil;