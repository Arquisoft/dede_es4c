import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from './icons/DeDe.png';
import CartDrawer from './CartDrawer';
import LogoutIcon from '@mui/icons-material/Logout';
import Producto from "./Producto";
import { UserContext } from '../context/userContext';
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {useSession } from "@inrupt/solid-ui-react";
import { InfoPod } from '../interface/interfaces';

const pages = ['Tienda', 'Historia'];
const settings = ['Signup', 'Login'];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const { stateUser, setInfo, logoutUser } = useContext(UserContext);

  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const { logout } = useSession();

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);

  };

  const handleLogout = () => {
    console.log(stateUser)
    logout();
    logoutUser();
    navigate("/");
    setOpen(true);
  }

  const handlePerfil = () => {
    navigate("/Perfil");
  }

  return (
    <AppBar position="relative" style={{ background: '#596886' }}>
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Link href='/'
            variant="h6"
            noWrap
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
            <img src={logo}></img>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link href='/'
            variant="h6"
            noWrap
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <img src={logo}></img>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link href={"/" + page} sx={{ my: 2, color: '#fff', display: 'block', pr: 4, pl: 4 }}>{page}</Link>
            ))}
          </Box>
          { stateUser.isAuthenticated &&
          <Box sx={{ flexGrow: 0, pr: 5 }}>
          <Tooltip title="Accede al perfil">
          <Button onClick={handlePerfil} >
            <AccountCircleIcon sx={{ color: "#fff" }} />
            </Button>
          </Tooltip>
          </Box>
        }
          {!stateUser.isAuthenticated &&
            <Box sx={{ flexGrow: 0, pr: 5 }}>
              <Tooltip title="Opciones de usuario">
                <IconButton onClick={handleOpenUserMenu} size='large'>
                  <AccountCircleIcon fontSize="inherit" sx={{ color: "#fff" }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <Link href={"/" + setting} sx={{ my: 2, color: '#000F', display: 'block' }} underline='none'>
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>

                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
          }
          <Box sx={{ flexGrow: 0, pr: 5 }}>
            <CartDrawer products={[]} />
          </Box>
          {stateUser.isAuthenticated &&
            <Box sx={{ flexGrow: 0, pr: 5 }}>
              <Tooltip title="Cerrar sesión">
                <Button onClick={handleLogout}>
                  <LogoutIcon sx={{ color: "#fff" }} />
                </Button>
              </Tooltip>
            </Box>
          }
        </Toolbar>
        <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Se ha cerrado la sesión"
                    action={action}
                  />
      </Container>
    </AppBar>
  );
};


export default NavBar;