import React, { useContext } from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate} from "react-router-dom";
import Home from './pages/Home';
import Tienda from './pages/Tienda';
import Historia from './pages/Historia';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Perfil from "./pages/Perfil";
import './App.css';
import {UserContext} from "./context/userContext";


function App(): JSX.Element {

  const {stateUser} = useContext(UserContext);

  return (
    <div className='App'>
      
      
     <Router>
     <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Tienda" element={<Tienda />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Historia" element={<Historia />} />
        <Route path="/Login" element={<Login />} />
        <Route
         path='/Perfil' element={stateUser.isAuthenticated ? <Perfil/> : <Login/>} /> 
      </Routes>
      <Footer/>
    </Router>
    </div>
  );
}

export default App;
