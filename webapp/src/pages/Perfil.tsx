import React, { useContext, useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import { UserContext } from "../context/userContext";
import './styles/profile.css';
import Button from '@mui/material/Button';
import { handleIncomingRedirect } from '@inrupt/solid-client-authn-browser'
import { getUsername, getUserInfo } from "../utils/solid";

import {
  useSession,
} from "@inrupt/solid-ui-react";

import { InfoPod } from "../interface/interfaces";


const Perfil = () => {

  const { stateUser, setInfo } = useContext(UserContext);

  const { session } = useSession();
  const { webId } = session.info;
  const [name, setName] = useState("");
  const [userData, setUserData] = useState({email:"", address:"", phone:""});

  useEffect(() => {
  handleIncomingRedirect({
    restorePreviousSession: true,
  }).then((info) => {
    console.log("iniciado sesion as " + info?.webId);
    setInfo(info as InfoPod);
  });
}, []);

  async function getName(){
    const value = await getUsername(session, webId!);
    setName(value!);
  }

  async function getUserData(){
    setUserData(await getUserInfo(session, webId!));
  }

  getName();
  getUserData();

  return (
    <div id="profile">
      
      <Card className="card" >
        <CardContent className="content">
          <Typography
            className={"username"}
            variant={"h2"}
            gutterBottom
          >
           {name}
          </Typography>
          <Avatar className="avatar" sx={{ width: 250, height: 250 }} />
          <Divider className="divider" />
          <Typography
            className={"email"}
            variant={"h6"}
          >
            Email: {userData.email}
          </Typography>
          <Typography
            className={"email"}
            variant={"h6"}
          >
            Dirección: {userData.address}
          </Typography>
          <Typography
            className={"email"}
            variant={"h6"}
          >
            Teléfono: {userData.phone}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Perfil;