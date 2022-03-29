import React, { useState, useEffect, useContext } from 'react';
import  {getUsers} from './api/api';
import {User} from './shared/shareddtypes';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Tienda from './pages/Tienda';
import Historia from './pages/Historia';
import Signup from './pages/Signup';
import Login from './pages/Login';
import InfoPods from './pages/InfoPods'
import Producto from "./pages/Producto";
import './App.css';
import { CartContext } from './context/cartContext';


const listaPorDefecto: Producto[] = [];
const CarritoContext = React.createContext(listaPorDefecto);

function App(): JSX.Element {

  //Contexto del carrito
  const {cartState} = useContext(CartContext);

  const [users,setUsers] = useState<User[]>([]);

  

  const refreshUserList = async () => {
    setUsers(await getUsers());
  }

  useEffect(()=>{
    refreshUserList();
  },[]);

  return (
    <div className='App'>
      <NavBar />
      
     <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Tienda" element={<Tienda />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Historia" element={<Historia />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/InfoPods" element={<InfoPods />} />
      </Routes>
    </Router>
    <Footer/>
    </div>
  );
}

export default App;
