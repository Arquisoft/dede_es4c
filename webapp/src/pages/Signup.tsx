import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./styles/signup.css";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Link } from "react-router-dom";

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
      <br></br>
      <Link to = "/InfoPods">
        <Button variant='contained' sx={{color: '#fff', m:1, backgroundColor: '#3e6969'}} endIcon={<InfoOutlinedIcon />}>Pods</Button>
      </Link>
      </div>
      
    </div>
    );
}

export default Signup;