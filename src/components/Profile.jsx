import React from "react";
import '../styles/Profile.css';
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import blackKing from '../images/blackKing.png'
import whiteKing from '../images/whiteKing.png'
import blackBishop from '../images/blackBishop.png'
import whiteBishop from'../images/whiteBishop.png'
import blackKnight from '../images/blackKnight.png'
import whiteKnight from '../images/whiteKnight.png'
import blackPawn from '../images/blackPawn.png'
import whitePawn from '../images/whitePawn.png'
import blackQueen from '../images/blackQueen.png'
import whiteQueen from '../images/whiteQueen.png'
import blackRook from '../images/blackRook.png'
import whiteRook from '../images/whiteRook.png'
import { Tooltip } from "@mui/material";
import { useRef, useEffect } from "react";

function Profile({ updateValue, modifyAvatarImage, modifyAvatarColor }) {
  const popupRef = useRef(null);

  useEffect(() => {
    // Function to close popup when clicked outside
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        updateValue(false);
      }
    }

    // Add event listener to detect clicks outside the popup
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const whiteImages = [whiteKing,whiteQueen,whiteBishop,whiteKnight,whiteRook,whitePawn]
  const blackImages = [blackKing,blackQueen,blackBishop,blackKnight,blackRook,blackPawn]
  const colors = ['blue','grey','green','yellow','orange','pink','purple','red']

  return (
    /* Devuelve un menú de opciones para el usuario */
    <div className='profile-settings' >
      <Tooltip title="Cerrar Perfil">
        <button onClick={() => updateValue()} className="profile-close-button">
          <CloseIcon sx={{width: 42, height: 42, color: "white"}}/>
        </button>
      </Tooltip>
      <div className="settings" ref={popupRef}>
        <h1>Perfil de usuario</h1>
        <hr style={{width: "90%"}}/>
        <div className="avatar-selector">
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
        <div className="avatar-selector">
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