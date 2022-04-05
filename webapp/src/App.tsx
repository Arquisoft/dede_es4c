import React, { useContext, useEffect } from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate} from "react-router-dom";
import Home from './pages/Home';
import Tienda from './pages/Tienda';
import Historia from './pages/Historia';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Perfil from "./pages/Perfil";
import InfoPods from './pages/InfoPods'
import { SessionContext, useSession } from "@inrupt/solid-ui-react";


import { handleIncomingRedirect, login, fetch, getDefaultSession } from '@inrupt/solid-client-authn-browser'
import { getSolidDataset, saveSolidDatasetAt } from "@inrupt/solid-client";
import './App.css';
import {UserContext} from "./context/userContext";
import { InfoPod } from './interface/interfaces';


function App(): JSX.Element {

  const {stateUser, setInfo} = useContext(UserContext);

  const { session } = useSession();



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
        <Route path='/Perfil' element={<Perfil/>} /> 
        <Route path="/InfoPods" element={<InfoPods />} />
      </Routes>
      <Footer/>
    </Router>
    </div>
  );
}

export default App;
