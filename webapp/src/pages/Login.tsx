import React, { useContext, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './styles/login.css';
import { UserContext } from '../context/userContext';
import foto from '../images/user.png';
import jwt_decode from "jwt-decode";
import axios from 'axios'
import { User } from "../interface/interfaces";
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const {setCurrentUser, logout} = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const userLogin = (user: any) => {
        const {email, password} = user;
        axios.post('http://localhost:5000/api/login', {
            email, password
        }).then( res => {
          if(res.status === 200){
            setToken(res.data.token);
            navigate("/"); // Cambiar cuando tengamos pantalla de perfil
          } else {
            setError(res.data.err.message);
            logout();
          }
        }).catch (error => {
          setError("Las credenciales no son correctas");
          logout();
        });
    };

    const setToken = (token: string) => {
      localStorage.setItem("jwt", token);
      var token_decoded : User = jwt_decode(token);
      setError("");
      setCurrentUser(token_decoded);
    }

    const submit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      const user = {email, password};

      if(email === "" || password === ""){
        setError("Rellene los datos solicitados correctamente")
      }else{
        userLogin(user);
      }
    }

    return (
    <div >
      <div id='formLogin'>
      <img src={foto}></img>
      <h1>Login</h1>
    <form onSubmit={submit}>
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
        onChange={(passwd) => setPassword(passwd.target.value)}
        value={password}
      />
      <br />
      <Button onClick={submit} variant='contained'>Enviar</Button>
      {error ? <Alert severity="error">{error}</Alert> : null }
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