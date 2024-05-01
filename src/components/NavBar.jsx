import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
const apiUrl = process.env.REACT_APP_API_URL;

function Navbar({ userInfo, updateUserInfo, resetUserInfo }) {
  const navigate = useNavigate();
  const [anchorElProfile, setAnchorElProfile] = useState(null); // Estado para el menú del perfil
  const [anchorElNotifications, setAnchorElNotifications] = useState(null); // Estado para el menú de notificaciones
  const [notifications, setNotifications] = useState([]); // Estado para almacenar las notificaciones
  const [hasNewNotifications, setHasNewNotifications] = useState(false); // Estado para indicar si hay nuevas notificaciones

  useEffect(() => {
    // Función para cargar las notificaciones al montar el componente
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`${apiUrl}/users/all_partidas_asincronas`);
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        const data = await response.json();
        setNotifications(data); // Actualiza el estado con las notificaciones obtenidas
        setHasNewNotifications(data.length > 0); // Verifica si hay nuevas notificaciones
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications(); // Llama a la función para cargar las notificaciones
  }, []);

  // Handlers para abrir y cerrar el menú del perfil
  const handleProfileClick = (event) => {
    setAnchorElProfile(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorElProfile(null);
  };

  // Handlers para abrir y cerrar el menú de notificaciones
  const handleNotificationsClick = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };
  const handleJugarPartida = (event) => {
    navigate(`/gameAsync/${event}`)
  };
  const handleNotificationsClose = () => {
    setAnchorElNotifications(null);
  };

  // Función para cerrar sesión
  const handleCloseSesion = async () => {
    resetUserInfo(); // Resetea la información del usuario
    try {
      // Cierre de sesión en el servidor
      const response = await fetch(`${apiUrl}/users/logout`, {
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
    } catch (error) {
      console.error('Error:', error);
    }

    updateUserInfo({ field: 'loggedIn', value: 'false' });
  };

  // Componente para el avatar del usuario
  const UserAvatar = () => (
    <Avatar
      alt="User"
      src={userInfo.avatarImage}
      sx={{ bgcolor: userInfo.avatarColor, width: 48, height: 48 }}
    />
  );

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-title">ChessHub</div>
        <div>
          {userInfo.loggedIn === 'true' ? (
            // Si el usuario está autenticado, mostrar los botones del usuario
            <>
              <div className="navbar-user-button">
                <NotificationsIcon
                  style={{
                    fontSize: 40,
                    color: hasNewNotifications ? 'orange' : 'white', // Cambia el color del icono si hay nuevas notificaciones
                    cursor: 'pointer'
                  }}
                  onClick={handleNotificationsClick} // Abrir menú de notificaciones al hacer clic en el ícono
                />
                <Menu
                  id="notifications-menu"
                  anchorEl={anchorElNotifications}
                  open={Boolean(anchorElNotifications)}
                  onClose={handleNotificationsClose}
                >
                  {notifications.map((notification, index) => (
                    <MenuItem key={index} onClick={()=> handleJugarPartida(notification.id)}>{notification.id} </MenuItem>
                  ))}
                </Menu>
                <button
                  className="navbar-user-button"
                  onClick={handleProfileClick} // Abrir menú de perfil al hacer clic en el avatar
                >
                  <UserAvatar />
                </button>
                <Menu
                  id="profile-menu"
                  anchorEl={anchorElProfile}
                  open={Boolean(anchorElProfile)}
                  onClose={handleProfileClose}
                >
                  <MenuItem onClick={() => navigate('/profile')}>Perfil</MenuItem>
                  <MenuItem onClick={handleCloseSesion}>Cerrar Sesión</MenuItem>
                </Menu>
              </div>
            </>
          ) : (
            // Si el usuario no está autenticado, mostrar el botón de inicio de sesión
            <a className="navbar-login-button" onClick={() => navigate('/login')}>
              Iniciar sesión
            </a>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
