import React, { useContext } from "react";
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import { UserContext } from "../context/userContext";
import './styles/profile.css';
import Button from '@mui/material/Button';

const Perfil = () => {

    const {stateUser} = useContext(UserContext);

  return (
    <div id="profile">
      <Card className="card" >
       
        <CardContent className="content">
          <Typography
            className={"username"}
            variant={"h2"}
            gutterBottom     
          >
            {stateUser.user._username}
          </Typography>
          <Avatar className="avatar" sx={{width:250, height:250}}/>
          <Divider className="divider"  />
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