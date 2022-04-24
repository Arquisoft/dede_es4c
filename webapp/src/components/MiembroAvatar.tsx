import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

function MiembroAvatar(props:any){
    
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem>
            <ListItemAvatar>
                <Avatar alt = {props.miembro.nombre} src = {props.miembro.imagen} sx={{ width: 50, height: 50 }}/>
            </ListItemAvatar>
            <ListItemText primary={props.miembro.nombre} secondary={props.miembro.uo} />
        </ListItem>
        <Divider />
        </List>
      );
}

export default MiembroAvatar;