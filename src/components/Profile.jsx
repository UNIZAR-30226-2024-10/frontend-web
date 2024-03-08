import React from "react";
import '../styles/Profile.css';
import CloseIcon from '@mui/icons-material/Close';
import king from '../images/king.jpeg';
import queen from '../images/queen.jpeg';
import pawn from '../images/pawn.jpeg';
import bishop from '../images/bishop.png';
import tower from '../images/tower.png';
import Avatar from '@mui/material/Avatar';
import { Tooltip } from "@mui/material";

function Profile({ updateValue, modifyAvatar }) {
  return (
    /* Devuelve un menú de opciones para el usuario */
    <div className='profile-settings'>
      <Tooltip title="Cerrar Perfil">
        <button onClick={() => updateValue()} className="profile-close-button">
          <CloseIcon sx={{width: 42, height: 42, color: "white"}}/>
        </button>
      </Tooltip>
      <div className="settings">
        <h1>Perfil de usuario</h1>
        <hr style={{width: "90%"}}/>
        <div className="avatar-selector">
         <button className="avatar-button" onClick={() => modifyAvatar('king')}>
            <Avatar 
            alt="User"
            src={king} 
            sx={{ margin: "10px", width: 48, height: 48 }}
            />
          </button>
          <button className="avatar-button" onClick={() => modifyAvatar('queen')}>
            <Avatar 
              alt="User"
              src={queen} 
              sx={{ margin: "10px", width: 48, height: 48 }}
            />
          </button>
          <button className="avatar-button" onClick={() => modifyAvatar('bishop')}>
            <Avatar 
              alt="User"
              src={bishop} 
              sx={{ margin: "10px", width: 48, height: 48 }}
            />
          </button>
          <button className="avatar-button" onClick={() => modifyAvatar('tower')}>
            <Avatar 
              alt="User"
              src={tower} 
              sx={{ margin: "10px", width: 48, height: 48 }}
            />
          </button>
          <button className="avatar-button" onClick={() => modifyAvatar('pawn')}>
            <Avatar 
              alt="User"
              src={pawn} 
              sx={{ margin: "10px", width: 48, height: 48 }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;