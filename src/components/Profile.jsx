import React from "react";
import '../styles/Profile.css';
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import blackKing from '../images/pieces/cburnett/bK.svg'
import whiteKing from '../images/pieces/cburnett/wK.svg'
import blackBishop from '../images/pieces/cburnett/bB.svg'
import whiteBishop from '../images/pieces/cburnett/wB.svg'
import blackKnight from '../images/pieces/cburnett/bN.svg'
import whiteKnight from '../images/pieces/cburnett/wN.svg'
import blackPawn from '../images/pieces/cburnett/bP.svg'
import whitePawn from '../images/pieces/cburnett/wP.svg'
import blackQueen from '../images/pieces/cburnett/bQ.svg'
import whiteQueen from '../images/pieces/cburnett/wQ.svg'
import blackRook from '../images/pieces/cburnett/bR.svg'
import whiteRook from '../images/pieces/cburnett/wR.svg'
import { Tooltip } from "@mui/material";
import { useRef, useEffect } from "react";

function Profile({ updateUserProfileVisibility, modifyAvatarImage, modifyAvatarColor }) {
  const popupRef = useRef(null); /* Referencia para el popUp */

  useEffect(() => {
    /* Cierra el PopUp cuando se hace click fuera de este */
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        updateUserProfileVisibility(false);
      }
    }
    /* Event listener to detect clicks outside the popup */
    document.addEventListener('mousedown', handleClickOutside);

    /* Cleanup function to remove event listener */
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /* Avatares y colores de fondo disponibles */
  const whiteImages = [whiteKing,whiteQueen,whiteBishop,whiteKnight,whiteRook,whitePawn]
  const blackImages = [blackKing,blackQueen,blackBishop,blackKnight,blackRook,blackPawn]
  const colors = ['blue','grey','green','yellow','orange','pink','purple','red']

   /* Perfil de usuario */
  return (
    <div className='profile-settings' >
      {/* Hint del botón de cerrar perfil */}
      <Tooltip
        title="Cerrar perfil"
        slotProps={{
          popper: {
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, -14],
                },
              },
            ],
          },
        }}
      >
        {/* Botón para cerrar el perfil */}
        <button onClick={updateUserProfileVisibility} className="profile-close-button">
          <CloseIcon sx={{
            width: 42, 
            height: 42, 
            color: "white",
          }}/>
        </button>
      </Tooltip>
      {/* Opciones del perfil */}
      <div className="settings" ref={popupRef}>
        <h1>Perfil de usuario</h1>
        <hr style={{width: "90%"}}/>
        <h2>Selecciona un avatar</h2>
        <hr style={{width: "90%"}}/>
        <div className="avatar-selector">
          {/* Listado de los avatares blancos */}
          {whiteImages.map((image,index) => (
            <button onClick={() => modifyAvatarImage(image)} className="avatar-button" key={index}>
              <Avatar 
                alt={`Image ${index + 1}`}
                src={image} 
                sx={{ width: 48, height: 48, margin: 0, padding: 0 }}
              />
            </button>
          ))}
        </div>
        <div className="avatar-selector">
          {/* Listado de los avateres negros */}
          {blackImages.map((image,index) => (
            <button onClick={() => modifyAvatarImage(image)} className="avatar-button" key={index}>
              <Avatar 
                alt={`Image ${index + 1}`}
                src={image} 
                sx={{ width: 48, height: 48, margin: 0, padding: 0 }}
              />
            </button>
          ))}
        </div>
        <hr style={{width: "90%"}}/>
        <h2>Selecciona un fondo para tu avatar</h2>
        <hr style={{width: "90%"}}/>
        <div className="avatar-selector">
          {/* Listado de los colores de fondo para el avatar */}
          {colors.map((color,index) => (
            <button onClick={() => modifyAvatarColor(color)} className="avatar-button" key={index}>
              <Avatar 
                alt=""
                src="" 
                sx={{ bgcolor: color, width: 48, height: 48, margin: 0, padding: 0 }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;