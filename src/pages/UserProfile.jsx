import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import '../styles/UserProfile.css'
import Profile from "../components/Profile.jsx";

function UserProfile ( args ) {
  const [showSidebar, setShowSidebar] = useState(false); /* Mostrar o esconder el sideBar */
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/cambio-credenciales');
  }

  return (
    <div className="backgroundProfile">
      <div className={showSidebar ? "sideProfile open" : "sideProfile"}>
        {/* sideBar */}
        <SideBar setShowSidebar={setShowSidebar} />
      </div>
      <div className="titleProfile">
        {/* Botón para desplegar el sidebar */}
        <button className={!showSidebar ? "sideMenuButton" : "sideMenuButton hidden"} onClick={() => setShowSidebar(true)}>
          <MenuIcon sx={{
            color: '#fff',
            backgroundColor: 'transparent',
            height: 52,
            width: 52,
          }} />
        </button>
        {/* Título de la página */}
        <h1 className="pageTitleProfile">PERFIL DE USUARIO</h1>
      </div>
      <div className="containerProfile">
        <div className={`containerProfile center ${args.userProfileVisibility ? 'showingProfile' : ''}`}>
          {!args.userProfileVisibility && <>
            <div className="userInfoProfile">
              <button className="userInfoProfileAvatarButton" onClick={args.updateUserProfileVisibility}>
                <Avatar 
                  alt="User"
                  src={args.userInfo.avatarImage}
                  sx={{ bgcolor: args.userInfo.avatarColor, width: 52, height: 52 }}
                />
              </button>
              <div className="userInfoProfileTextTitle">
                <h2><u>INFORMACION DE LA CUENTA</u></h2>
                <div className="userInfoProfileTextContent">
                  <div>
                    <h3>Nombre de usuario: Calvera</h3>
                    <h3>Correo Electrónico: asdas@asdasd.com</h3>
                    <h3>Contraseña: *****************</h3>
                  </div>
                  <button className="userInfoProfileButton" onClick={handleClick}>
                    Modificar información
                  </button>
                </div>
              </div>
            </div>
            <div className="userEloProfile">
              <div className="userEloProfileTextTitle">
                <h2><u>INFORMACION DE JUEGO</u></h2>
                <div>
                  <h3>Elo en modo Rapid: 1200</h3>
                  <h3>Elo en modo Blitz: 3245</h3>
                  <h3>Elo en modo Bullet: 1200</h3>
                </div>
              </div>
              <div className="userEloProfileTextTitle">
                <h2><u>ULTIMA RECOMPENSA</u></h2>
                <div>
                  <h1 style={{fontSize: '40px'}}>😁️</h1>
                </div>
              </div>
            </div>
          </>}
          {args.userProfileVisibility && <>
            <Profile updateUserProfileVisibility={args.updateUserProfileVisibility} userInfo={args.userInfo} modifyAvatarImage={args.modifyAvatarImage} modifyAvatarColor={args.modifyAvatarColor}/>
          </>}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;