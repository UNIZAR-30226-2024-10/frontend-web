import React from 'react';
import '../styles/Navbar.css';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import avatar from '../images/images.jpeg'

function Navbar () {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const UserAvatar = () => { /* Avatar del usuario */
    return (
      <Avatar 
        alt="User" /* Modificar en funcion del nombre del usuario */
        src={avatar} 
        sx={{ bgcolor: deepOrange[500], width: 56, height: 56 }}
      />
    );
  }

  const MenuUser = () => { /* Menu desplegable */
    return (
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open} /* If true, muestra los elementos del menu */
        onClose={handleClose}
        MenuListProps={{'aria-labelledby': 'basic-button' }}>
        {/* Opciones del menú desplegable*/}
        <MenuItem onClick={handleClose}>Perfil</MenuItem>
        <MenuItem onClick={handleClose}>Cerrar Sesión</MenuItem>
      </Menu>
    );
  }
  
  return (
    <nav className='navbar'>
      <div className='navbar-title'>
        ChessHub
      </div>
      <div>
        <button className='navbar-user-button'
          onClick={handleClick} 
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <UserAvatar />
        </button>
        <MenuUser />
      </div>
    </nav>
  );
}

export default Navbar;