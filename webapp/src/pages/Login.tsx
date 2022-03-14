import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './styles/login.css';
import foto from '../images/user.png';

const Login = () => {
    return (
    <div >
      <div id='formLogin'>
      <img src={foto}></img>
      <h1>Login</h1>
    <form>
      <TextField
          className='textfield'
        name="username"
        label="User name"
        variant="outlined"
      />
      <TextField
      className='textfield'
        name="password"
        label="Password"
        variant="outlined"
      />
      <br />
      <Button variant='contained'>Enviar</Button>
    </form>
    <p>
      ¿No tienes cuenta? <br />
      <a href="/Signup">Crea una ahora</a>
    </p>
    </div>
    </div>
  
    );
}

export default Login;