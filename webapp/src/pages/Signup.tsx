import React, { useContext, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./styles/signup.css";
import { UserContext } from '../context/userContext';
import axios from 'axios'
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import { User } from "../interface/interfaces";

const Signup = () => {

  const {setCurrentUser, logout} = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const userSignup = (user:any) => {
    const {username, email, password, repeatPassword} = user;
    axios.post('http://localhost:5000/api/signup', {
      username, email, password
    }).then( res => {
      setToken(res.data.token);
      navigate("/");
    }).catch(error => {
        setError("Se ha producido un error");
    });
  }

  const setToken = (token: string) => {
    localStorage.setItem("jwt", token);
    var token_decoded : User = jwt_decode(token);
    setError("");
    setCurrentUser(token_decoded);
  }

  const submit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const user = {username, email, password, repeatPassword};
    if(username === "" || email === "" || password === "" || repeatPassword === ""){
      setError("Rellene los datos solicitados correctamente")
    }else if(password !== repeatPassword){
      setError("Las contraseñas no coinciden")
    }else{
      userSignup(user);
    }
  }

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
          onChange={(u) => setUsername(u.target.value)}
          value={username}
        />
        <TextField
        className='textfield'
          name="email"
          label="Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <TextField
        type="password"
        className='textfield'
          name="password"
          label="Password"
          variant="outlined"
          onChange={(p) => setPassword(p.target.value)}
          value={password}
        />
        <TextField
         type="password"
        className='textfield'
          name="pwconfirm"
          label="Pwconfirm"
          variant="outlined"
          onChange={(rp) => setRepeatPassword(rp.target.value)}
          value={repeatPassword}
        />
        <br />
        <Button onClick={submit} variant='contained'>Enviar</Button>
        {error ? <Alert severity="error">{error}</Alert> : null }
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