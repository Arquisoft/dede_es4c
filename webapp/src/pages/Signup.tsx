import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./styles/signup.css";
import fondo from '../images/fondoComida.jpg';

const Signup = () => {
    return (
        <div id="signupView">
      
        <div id='form'>
        <h1>Sign Up</h1>
      <form>
        <TextField
            className='textfield'
          name="username"
          label="User name"
          variant="outlined"
        />
        <TextField
        className='textfield'
          name="email"
          label="Email"
          variant="outlined"
        />
        <TextField
        className='textfield'
          name="password"
          label="Password"
          variant="outlined"
        />
        <TextField
        className='textfield'
          name="pwconfirm"
          label="Pwconfirm"
          variant="outlined"
        />
        <br />
        <Button variant='contained'>Enviar</Button>
      </form>
      <p>
        ¿Ya tienes una cuenta? <br />
        <a href="/Login">Inicia sesión</a>
      </p>
      </div>
      
    </div>
    );
}

export default Signup;