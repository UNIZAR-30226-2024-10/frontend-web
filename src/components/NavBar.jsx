import React from 'react';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import avatar from '../images/user_avatar.jpeg';

function Navbar () {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(true); // Cambiado a camelCase según las convenciones de JavaScript
  const [profileVisibility, setProfileVisibility] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    setProfileVisibility(true);
    setAnchorEl(null);
  };

  const UserAvatar = () => {
    return (
      <Avatar 
        alt="User"
        src={avatar} 
        sx={{ bgcolor: deepOrange[500], width: 48, height: 48 }}
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
        <MenuItem onClick={handleProfile}>Perfil</MenuItem>
        <MenuItem onClick={handleClose}>Cerrar Sesión</MenuItem>
      </Menu>
    );
  }

  const ProfilePopup = () => {
    return(
      <div className='profile'>
        <div className='profile-settings'>
          <h1>Perfil de usuario</h1>
          <hr style={{width: '90%', }}/>
          <div>
            Mostrar diferentes ajustes para el usuario ...
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div>
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
      {profileVisibility && <ProfilePopup />}
    </div>
  );
}

export default Navbar;
