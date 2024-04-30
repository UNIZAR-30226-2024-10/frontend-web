import { useState } from "react";
import whiteKing from '../images/pieces/cburnett/wK.svg'

/* Establece el modo de juego al que se está jugando */
export const GameMode = () => {
  const [gameMode, setGameMode] = useState('Rapid');
  const updateMode = (newMode) => {
    setGameMode(newMode);
  };
  return {
    gameMode,
    updateMode,
  };
}

/* Hook para almacenar el nombre de los jugadores en partida */
export const PlayersInGame = () => { 
  const [playersInfo, setPlayersInfo] = useState({
    me : '', 
    opponent: '',
  });
  const updatePlayersInGame = (players) => {
    setPlayersInfo({
      me : players.me,
      opponent : players.opponent,
    });
  };
  return {
    playersInfo,
    updatePlayersInGame,
  };
}

/* Hook para mostrar el perfil del usuario */
export const ShowUserProfile = () => { 
  const [userProfileVisibility, setUserProfileVisibility] = useState(false);
  const updateUserProfileVisibility = () => {
    setUserProfileVisibility(!userProfileVisibility);
  };
  return {
    userProfileVisibility,
    updateUserProfileVisibility,
  };
}

/* Hook para información acerca del usuario */
export const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    /* Información a guardar de cada usuario */
    loggedIn : sessionStorage.getItem('loggedIn') || 'false',
    userName : sessionStorage.getItem('userName') || '',
    userId : sessionStorage.getItem('userId') || '',
    userCorreo : sessionStorage.getItem('userCorreo') || '',
    avatarImage : sessionStorage.getItem('avatarImage') || whiteKing, 
    avatarColor: sessionStorage.getItem('avatarColor') || 'orange',
    eloRapid : sessionStorage.getItem('eloRapid') || '', 
    eloBullet : sessionStorage.getItem('eloBullet') || '', 
    eloBlitz : sessionStorage.getItem('eloBlitz') || '',
  });
  const resetUserInfo = () => {
    /* resetea la información del usuario */
    sessionStorage.clear();
  }
  const updateUserInfo = (data) => {
    setUserInfo(prevState => ({
      /* Modifica solo el campo campo indicado con el valor indicado */
      ...prevState,
      [data.field] : data.value,
    }));
    // Actualiza los valores en el navegador
    sessionStorage.setItem([data.field], data.value);
  }
  const modifyAvatarImage = (newAvatar) => {
    setUserInfo(prevState => ({
      ...prevState,
      avatarImage : newAvatar,
    }));
    // Actualiza los valores en el navegador
    sessionStorage.setItem('avatarImage', newAvatar);
  };
  const modifyAvatarColor = (newColor) => {
    setUserInfo(prevState => ({
      ...prevState,
      avatarColor : newColor,
    }));
    // Actualiza los valores en el navegador
    sessionStorage.setItem('avatarColor', newColor);
  }

  return {
    userInfo,
    updateUserInfo,
    modifyAvatarImage,
    modifyAvatarColor,
    resetUserInfo,
  }
}