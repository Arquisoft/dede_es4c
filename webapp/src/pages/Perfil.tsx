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
import { getUsername } from "../utils/solid";


import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";

import {
  useSession,
  CombinedDataProvider,
  Image,
  Text,
} from "@inrupt/solid-ui-react";

import {
  getUrlAll,
  getSolidDataset,
  getThing,
  getFile
} from "@inrupt/solid-client";
import { InfoPod } from "../interface/interfaces";

const Perfil = () => {

  const { stateUser, setInfo } = useContext(UserContext);

  const { session } = useSession();
  const { webId } = session.info;
  const [name, setName] = useState("");

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

  getName();
  

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
            Email: {stateUser.user._email}
          </Typography>
          <Typography
            className={"email"}
            variant={"h6"}
          >
            Dirección:
          </Typography>
          <Typography
            className={"email"}
            variant={"h6"}
          >
            Teléfono:
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Perfil;