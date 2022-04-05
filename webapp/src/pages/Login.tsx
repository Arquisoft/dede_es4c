import React, { useContext, useState } from "react";
import TextField from '@mui/material/TextField';
import './styles/login.css';
import { UserContext } from '../context/userContext';
import foto from '../images/user.png';
import jwt_decode from "jwt-decode";
import axios from 'axios'
import { Token } from "../interface/interfaces";
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import { LoginButton } from "@inrupt/solid-ui-react";
import Button from '@mui/material/Button';


const Login = () => {
    const {setCurrentUser, logoutUser} = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const idp = "https://broker.pod.inrupt.com";
	 const redirUrl = "http://localhost:3000/Perfil";

    const userLogin = (user: any) => {
       
        axios.post('http://localhost:5000/api/login', {
            email, password
        }).then( res => {
          if(res.status === 200){
            setToken(res.data.token);
            navigate("/Perfil"); 
          } else {
            setError(res.data.err.message);
            logoutUser();
          }
        }).catch ((_e) => {
          setError("Las credenciales no son correctas");
          logoutUser();
        });
    };

    const setToken = (token: string) => {
      localStorage.setItem("jwt", token);
      var token_decoded = jwt_decode<Token>(token);
      setError("");
      setCurrentUser(token_decoded.user);
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
    <LoginButton
					authOptions={{ clientName: "dede_es4c" }}
					oidcIssuer={idp}
					redirectUrl={redirUrl}
          onError={console.error} >
            <Button variant="contained" sx={{bgcolor: '#596886'}}>Entra con tu POD</Button> 
            </LoginButton> 
    <p>
      ¿No tienes uno todavía? <br />
      <a href="/Signup">Crea uno ahora</a>
    </p>
    </div>
    </div>
  
    );
}

export default Login;