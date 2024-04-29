import React, { useState } from 'react';
import '../styles/Navbar.css';
import { useNavigate, useResolvedPath } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
const apiUrl = process.env.REACT_APP_API_URL;

function Navbar ({ userInfo, updateUserInfo, resetUserInfo }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null); /* Hook para controlar si el menu es visible o no */
  const open = Boolean(anchorEl);

  /* Abrir el menú */
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  /* Cerrar el menú */
  const handleClose = () => {
    setAnchorEl(null);
  };
  /* Mostrar el perfil de usuario */
  const handleProfile = () => {
    setAnchorEl(null);
    navigate('/profile');
  }
  /* Cerrar sesión */
  const [error,setError] = useState('');
  const handleCloseSesion = async () => {
    resetUserInfo(); // Resetea la informacíón del navegador
    try { // Cierre de sesión
      const response = await fetch(`${apiUrl}/users/logout` ,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log(responseData.message);
    }   
    catch (error) {
      setError(error.message);
    }

    updateUserInfo({ field : "loggedIn", value : 'false'});
    setAnchorEl(null);
  }

  const UserAvatar = () => {
    return (
      /* Avatar del usuario */
      <Avatar 
        alt="User"
        src={userInfo.avatarImage}
        sx={{ bgcolor: userInfo.avatarColor, width: 48, height: 48 }}
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
        {/* Opciones del menu desplegable */}
        <MenuItem onClick={handleProfile}>Perfil</MenuItem> 
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
          {console.log("info del user",userInfo)}
          {userInfo.loggedIn === 'true' ? ( // Aquí comprobamos si el usuario está autenticado
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
