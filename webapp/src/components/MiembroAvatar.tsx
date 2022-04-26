import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

function MiembroAvatar(props:any){
    var nombre = "Sin nombre";
    var foto = "";
    var uo = "UOxxxxxx";
    if(props.miembro !== undefined){
        nombre = props.miembro.nombre;
        foto = props.miembro.imagen;
        uo = props.miembro.uo;
    }
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem>
            <ListItemAvatar>
                <Avatar alt = {nombre} src = {foto} sx={{ width: 50, height: 50 }}/>
            </ListItemAvatar>
            <ListItemText primary={nombre} secondary={uo} />
        </ListItem>
        <Divider />
        </List>
      );
}

export default MiembroAvatar;