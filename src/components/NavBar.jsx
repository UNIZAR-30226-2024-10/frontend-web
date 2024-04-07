import React from 'react';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Navbar ({ updateValue, avatar }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null); // Hook para el menú desplegable
  const [loggedIn, setLoggedIn] = React.useState(true); // Hook para diferenciar si un usuario esta identificado o no
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    updateValue();
    setAnchorEl(null);
  }
  const handleCloseSesion = () => {
    setLoggedIn(false);
    setAnchorEl(null);
  }

  const UserAvatar = () => {
    return (
      /* Avatar del usuario */
      <Avatar 
        alt="User"
        src={avatar.image}
        sx={{ bgcolor: avatar.bgcolor, width: 48, height: 48 }}
      />
    );
  }

  const MenuUser = () => {
    return (
      /* Menú desplegable al hacer click sobre la imagen del perfil*/
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{'aria-labelledby': 'basic-button' }}>
        <MenuItem onClick={handleProfile}>Perfil</MenuItem> {/* Opciones del menu desplegable */}
        <MenuItem onClick={handleCloseSesion}>Cerrar Sesión</MenuItem>
      </Menu>
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
    </div>
  );
}

export default Navbar;
