import React from 'react';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import avatar from '../images/images.jpeg';

function Navbar () {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false); // Cambiado a camelCase según las convenciones de JavaScript
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const UserAvatar = () => {
    return (
      <Avatar 
        alt="User"
        src={avatar} 
        sx={{ bgcolor: deepOrange[500], width: 56, height: 56 }}
      />
    );
  }

  const MenuUser = () => {
    return (
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{'aria-labelledby': 'basic-button' }}>
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
        {loggedIn ? ( // Aquí comprobamos si el usuario está autenticado
          <>
            <button className='navbar-user-button'
              onClick={handleClick} 
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <UserAvatar />
            </button>
            <MenuUser />
          </>
        ) : (
          // Si el usuario no está autenticado, mostramos el botón de inicio de sesión
          <a className='navbar-login-button' onClick={()=>{
            navigate('/login');
          }}>Iniciar sesión</a>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
