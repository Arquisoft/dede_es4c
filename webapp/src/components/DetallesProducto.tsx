import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import cabecera from '../images/cabecera.jpg';
import InfoIcon from '@mui/icons-material/Info';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';

function Detalles(props:any){
    type Anchor = 'top' | 'left' | 'bottom' | 'right';

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });

const toggleDrawer =
  (anchor: Anchor, open: boolean) =>
  (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
  
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <img id = "detalles" src={cabecera}/>
        <Typography textAlign="center" gutterBottom variant="h2" component="div">
            {props.product.nombre}
          </Typography>
          <Divider></Divider>
          <Typography textAlign="center" gutterBottom variant="h4" color = "#000034" component="div">
              Descripción:
          </Typography>
          <Typography textAlign="center" gutterBottom variant="h5" component="div">
              {props.product.description}
          </Typography>
          <Typography textAlign="center" gutterBottom variant="h4" color = "#000034" component="div">
              Ingredientes:
          </Typography>
          {props.product.ingredientes.map((ingrediente: string) =>(
            <Typography textAlign="center" gutterBottom variant="h5" component="div">
              - {ingrediente}
            </Typography>
          ))}
          
          <Divider></Divider>
          <Typography textAlign="center" variant="body2" color="text.secondary">
            Precio: {props.product.precio} €
          </Typography>
      
    </Box>
  );

  return (
    <div>
    <React.Fragment key={'top'}>
    <Button variant="contained" sx={{color: '#fff', m:1, backgroundColor: '#581845'}} endIcon={<InfoIcon />} onClick={toggleDrawer('top', true)} >Detalles producto</Button>
      <Drawer
        anchor={'top'}
        open={state['top']}
        onClose={toggleDrawer('top', false)}
        variant='temporary'
      >
        {list('top')}
      </Drawer>
    </React.Fragment>
    </div>
  )
}

export default Detalles;